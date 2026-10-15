import {
  View,
  Image,
  ListRenderItem,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/ui/header/Header';
import { icons } from '@/config/icons';
import AppInput from '@/components/ui/appInput/AppInput';
import AppButton from '@/components/ui/appButton/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from '@/hooks/useDebounce';
import { FetchItemsData } from '@/types/apis/settings.types';
import RenderItems from '@/components/flatlist/renderItems/RenderItems';
import { RootScreenProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/ui/loader/Loader';
import { useItemList } from '@/hooks/apis/settings/useItemList';

const ItemsScreen = ({ navigation }: RootScreenProps<'ItemsScreen'>) => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState<string>('');
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const {
    itemListData,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useItemList();
  const insets = useSafeAreaInsets();
  const debouncedsearch = useDebounce(search);
  const styles = useMemo(() => createStyles(theme), [theme]);

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

  const processedData = useMemo(() => {
    const trimmedSearch = debouncedsearch.trim().toLowerCase();
    if (!trimmedSearch) {
      return itemListData ?? [];
    }
    return (itemListData ?? []).filter(item =>
      item?.name?.toLowerCase()?.includes(trimmedSearch),
    );
  }, [debouncedsearch, itemListData]);

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

 const renderFooter = useCallback(() => {
     return isFetchingNextPage && <ActivityIndicator size="small" />;
   }, [isFetchingNextPage]);

  const renderEmpty = useMemo(() => {
    if (isFetching) {
      return null;
    }
    return (
      <EmptyStateScreen
        icon={images.img_itemempty}
        primaryText="No Items Found"
        message="Click on the “+ New Items"
        nextMessage=" below to add new item."
      />
    );
  }, [isFetching]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt={t('settings.inventorySetup.items')} borderBottomEnabled={true} />
        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />
            <AppInput
              style={styles.noBorderInput}
              placeholder={t('inputs.search.items')}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt={t('button.newItems')}
            txtColor={theme.primaryText}
            gap={8}
            onPress={navigateToNewItem}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </AppButton>
        </View>
      </View>
     <Loader visible={ isPending } />
    </LinearGradient>
  );
};

export default ItemsScreen;
