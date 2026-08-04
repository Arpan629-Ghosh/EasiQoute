import {
  View,
  Image,
  ListRenderItem,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import { icons } from '@/config/icons';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import { useDebounce } from '@/hooks/useDebounce';
import { FetchItemsData } from '@/types/apis/settings.types';
import RenderItems from '@/components/renderItems/RenderItems';
import ItemEmptyScreen from '@/components/emptyScreenComponents/ItemEmptyScreen';
import { RootScreenProps } from '@/types/navigation.types';

const ItemsScreen = ({ navigation }: RootScreenProps<'ItemsScreen'>) => {
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<string>('');
  const page = useRef(1);
  const { theme } = useAppTheme();
  const {
    fetchItems,
    isStale,
    items_data,
    items_current_page,
    items_last_page,
    settingLoading,
  } = useSettings();
  const insets = useSafeAreaInsets();

  const debouncedsearch = useDebounce(search);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    if (isStale || !items_data.length) {
      page.current = 1;
      fetchItems(1);
    }
  }, [isStale, items_data.length, fetchItems])

  const hasMore = useMemo(() => {
    return items_current_page < items_last_page;
  }, [items_current_page, items_last_page]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    page.current = 1;
    setRefreshing(true);
    await fetchItems(1);
    setRefreshing(false);
  }, [fetchItems, refreshing]);

  const handleLoadMore = useCallback(() => {
    if (paginationLoading || refreshing || !hasMore) {
      return;
    }
    setPaginationLoading(true);
    const nextPage = page.current + 1;
    page.current = nextPage;
    fetchItems(nextPage);
    setPaginationLoading(false);
  }, [paginationLoading, refreshing, hasMore, fetchItems]);

  const processedData = useMemo(() => {
    const trimmedSearch = debouncedsearch.trim().toLowerCase();
    if (!trimmedSearch) {
      return items_data ?? [];
    }
    return (items_data ?? []).filter(item =>
      item?.name?.toLowerCase()?.includes(trimmedSearch),
    );
  }, [debouncedsearch, items_data]);

  const navigateToNewItem = () => {
    navigation.navigate('NewItemsScreen');
  };

  const renderItem: ListRenderItem<FetchItemsData> = useCallback(({ item }) => {
    return <RenderItems item={item} />;
  }, []);

  const keyExtractor = useCallback(
    (item: FetchItemsData) => item.id.toString(),
    [],
  );

  const renderFooter = useMemo(() => {
    if (!paginationLoading) {
      return null;
    }

    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [paginationLoading, styles.loaderContainer]);

  const renderEmpty = useMemo(() => {
    if (settingLoading) {
      return null;
    }
    return <ItemEmptyScreen />;
  }, [settingLoading]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Items" borderBottomEnabled={true} />
        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />
            <Input
              style={styles.noBorderInput}
              placeholder="Search ‘Items’"
              returnKeyType="search"
              value={search}
              onChangeText={txt => setSearch(txt)}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={processedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshing={refreshing}
        onRefresh={handleRefresh}
        removeClippedSubviews={false}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={8}
        windowSize={5}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            handleLoadMore();

            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="New Item"
            txtColor={theme.primaryText}
            gap={8}
            onPress={navigateToNewItem}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ItemsScreen;
