import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import ClientSortBottomSheet from '@/components/clientSortBottomSheet/ClientSortBottomSheet';
import { useClient } from '@/hooks/apis/useClient';
import Loader from '@/components/loader/Loader';
import { useToast } from '@/hooks/useToast';
import RenderClients from '@/components/renderClients/RenderClients';
import { useDebounce } from '@/hooks/useDebounce';
import { Clients, GetClients, SORT_BY } from '@/types/apis/client.types';
import { ClientStackProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';

const ClientScreen = ({ navigation }: ClientStackProps<'ClientScreen'>) => {
  const [open, setOpen] = useState(false);
  const [selctedSortOption, setSelectedSortOptions] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const { theme, isDark } = useAppTheme();
  const { showToast } = useToast();
  const { getClients, loading, clients, current_page, last_page } = useClient();
  const debouncedSearch = useDebounce(search, 500);
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    page.current = 1;
    const payload: GetClients = {
      sort_by: 'asc',
      page: 1,
    }
    getClients(payload)
  }, [getClients])

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const navigateToAddClient = () => {
    navigation.navigate('AddClientScreen');
  };

  const toggleSort = useCallback(
    async (type: string) => {
      const updatedStatus = selctedSortOption === type ? '' : type;

      setSelectedSortOptions(updatedStatus);

      try {
        let sort: SORT_BY = 'asc';

        switch (updatedStatus) {
          case 'Most Active':
            sort = 'ma';
            break;

          case 'Recently Added':
            sort = 'desc';
            break;

          default:
            sort = 'asc';
        }

        const payload: GetClients = {
          sort_by: sort,
          page: page.current,
        };

        await getClients(payload);
      } catch (error) {
        showToast(String(error), 'error');
      }
    },
    [selctedSortOption, getClients, showToast],
  );

  const hasMore = useMemo(() => {
    return current_page < last_page;
  }, [current_page, last_page]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) {
      return;
    }
    try {
      setRefreshing(true);
      page.current = 1;
      const payload: GetClients = {
        page: 1,
        sort_by: 'asc',
      };
      await getClients(payload);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, getClients]);

  const handleLoadMore = useCallback(async () => {
    if (paginationLoading || refreshing || !hasMore) {
      return;
    }
    try {
      setPaginationLoading(true);
      const nextPage = page.current + 1;
      page.current = nextPage;
      const payload: GetClients = {
        page: nextPage,
        sort_by: 'asc',
      };
      await getClients(payload);
    } finally {
      setPaginationLoading(false);
    }
  }, [paginationLoading, refreshing, hasMore, getClients]);

  const renderFooter = useCallback(() => {
    if (!paginationLoading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [paginationLoading, styles.loaderContainer]);

  const renderItem = useCallback(({ item }: { item: Clients }) => {
    return <RenderClients item={item} />;
  }, []);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return null;
    }

    return (
      <EmptyStateScreen
        icon={images.img_noclient}
        primaryText="No Clients Found"
        message="Click on the + below to create"
        nextMessage="a new quote."
      />
    );
  }, [loading]);

  const processedData = useMemo(() => {
    let result = clients;

    if (!debouncedSearch.trim()) return result;

    result = result.filter(item =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    return result;
  }, [clients, debouncedSearch]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View
            style={[styles.headerComponent, { paddingTop: insets.top + 12 }]}
          >
            <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
              Clients
            </InterTightSemiBold>
            <View style={styles.topComponent}>
              <View style={styles.inputicon}>
                <Image source={icons.ic_whitesearch} style={styles.searchic} />

                <AppInput
                  bg={theme.searchInput}
                  style={styles.noBorderInput}
                  placeholder="Search ‘client name’"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Image source={icons.ic_clientsort} style={styles.img} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          data={processedData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              handleLoadMore();
              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          contentContainerStyle={styles.flatlist}
          style={styles.card}
        />

        <View style={styles.add}>
          <TouchableOpacity activeOpacity={0.8} onPress={navigateToAddClient}>
            <Image source={icons.ic_add} style={styles.ic} />
          </TouchableOpacity>
        </View>
      </View>
      <ClientSortBottomSheet
        visible={open}
        onClose={handleClose}
        selectedSortOption={selctedSortOption}
        onToggleSort={toggleSort}
      />
      {!refreshing && !paginationLoading && <Loader visible={loading} />}
    </LinearGradient>
  );
};

export default ClientScreen;
