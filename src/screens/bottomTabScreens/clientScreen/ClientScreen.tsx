import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import ClientSortBottomSheet from '@/components/clientSortBottomSheet/ClientSortBottomSheet';
import Loader from '@/components/loader/Loader';
import RenderClients from '@/components/renderClients/RenderClients';
import { useDebounce } from '@/hooks/useDebounce';
import { Clients, SORT_BY } from '@/types/apis/client.types';
import { ClientStackProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useClientList } from '@/hooks/apis/clients/useClientList';

const ClientScreen = ({ navigation }: ClientStackProps<'ClientScreen'>) => {
  const [open, setOpen] = useState(false);
  const [selctedSortOption, setSelectedSortOptions] = useState<string>('A-Z');
  const [search, setSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const { theme, isDark } = useAppTheme();
  const debouncedSearch = useDebounce(search, 500);

  const sortBy = useMemo<SORT_BY>(() => {
    switch (selctedSortOption) {
      case 'Most Active':
        return 'ma';

      case 'Recently Added':
        return 'desc';

      default:
        return 'asc';
    }
  }, [selctedSortOption]);

  const {
    clientListData,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useClientList({
    sort_by: sortBy,
    search: debouncedSearch.trim(),
  });
  
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const navigateToAddClient = () => {
    navigation.navigate('AddClientScreen');
  };

  const toggleSort = useCallback((type: string = 'A-Z') => {
    setSelectedSortOptions(previous => (previous === type ? '' : type));
  }, []);

  const handleRefresh = useCallback(async () => {
      try {
        setRefreshing(true);
        await refetch();
      } finally {
        setRefreshing(false);
      }
    }, [refetch]);

    const handleLoadMore = useCallback(async () => {
      if (!hasNextPage || isFetchingNextPage || isFetching) {
        return;
      }
      fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

    const renderEmpty = useCallback(() => {
      if (isFetching) {
        return null;
      }

      return (
        <EmptyStateScreen
          icon={isDark ? images.img_darkquote : icons.ic_boldqoute}
          primaryText="No clients Found"
          message="Click on the + below to create"
          nextMessage="a new quote."
        />
      );
    }, [isFetching, isDark]);

  const renderFooter = useCallback(() => {
      return isFetchingNextPage && <ActivityIndicator size="small" />;
    }, [isFetchingNextPage]);

  const renderItem = useCallback(({ item }: { item: Clients }) => {
    return <RenderClients item={item} />;
  }, []);


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
          data={clientListData  }
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
          onEndReached={handleLoadMore}
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
       <Loader visible={isPending} />
    </LinearGradient>
  );
};

export default ClientScreen;
