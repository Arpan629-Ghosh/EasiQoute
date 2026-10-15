import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/ui/header/Header';
import AppInput from '@/components/ui/appInput/AppInput';
import AppButton from '@/components/ui/appButton/AppButton';
import RenderCategories from '@/components/flatlist/renderCategories/RenderCategories';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDebounce } from '@/hooks/useDebounce';
import { createStyles } from './style';
import { CreateCategoriesPayload } from '@/types/apis/settings.types';
import { RootScreenProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/ui/loader/Loader';
import { useCategoryList } from '@/hooks/apis/settings/useCategoryList';

const CategoriesScreen = ({ navigation }: RootScreenProps<'CategoriesScreen'>) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();

  const {
      categoryListData,
      isPending,
      isFetching,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      refetch,
    } = useCategoryList();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearch = useDebounce(search);
  
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
    const trimmedSearch = debouncedSearch?.trim()?.toLowerCase();
    if (!trimmedSearch) {
      return categoryListData ?? [];
    }
    return (categoryListData ?? []).filter(item =>
      item?.name?.toLowerCase()?.includes(trimmedSearch),
    );
  }, [categoryListData, debouncedSearch]);


  const navigateToNewCategory = useCallback(() => {
    navigation.navigate('NewCategoryScreen');
  }, [navigation]);

  const renderItem: ListRenderItem<CreateCategoriesPayload> = useCallback(
    ({ item }) => {
      return <RenderCategories item={item} />;
    },
    [],
  );

  const keyExtractor = useCallback(
    (item: CreateCategoriesPayload) => item.id.toString(),
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
        icon={images.img_categoryempty}
        primaryText="No Categories Found"
        message="Click on the “+ New Category”"
        nextMessage=" below to add new item."
      />
    );
  }, [isFetching]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header
          txt={t('settings.inventorySetup.categories')}
          borderBottomEnabled
        />

        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />
            <AppInput
              style={styles.noBorderInput}
              placeholder={t('inputs.search.categories')}
              returnKeyType="search"
              value={search}
              onChangeText={setSearch}
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

      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt={t('button.newCategory')}
            txtColor={theme.primaryText}
            gap={8}
            onPress={navigateToNewCategory}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </AppButton>
        </View>
      </View>
     <Loader visible={ isPending } />
    </LinearGradient>
  );
};

export default CategoriesScreen;
