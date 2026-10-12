import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Image,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/header/Header';
import AppInput from '@/components/appInput/AppInput';
import AppButton from '@/components/appButton/AppButton';
import RenderSubCategories from '@/components/renderSubCategories/RenderSubCategories';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDebounce } from '@/hooks/useDebounce';
import { createStyles } from './style';
import { SubCategoriesPayload } from '@/types/apis/settings.types';
import { RootScreenProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/loader/Loader';
import { useSubCategoryList } from '@/hooks/apis/settings/useSubCategoryList';

const SubCategoriesScreen = ({
  navigation,
}: RootScreenProps<'SubCategoriesScreen'>) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {
      subCategoryListData,
      isPending,
      isFetching,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      refetch,
    } = useSubCategoryList();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearch = useDebounce(search);

  const handleLoadMore = useCallback(async () => {
      if (!hasNextPage || isFetchingNextPage || isFetching) {
        return;
      }
      fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

  const handleRefresh = useCallback(async () => {
      try {
        setRefreshing(true);
        await refetch();
      } finally {
        setRefreshing(false);
      }
    }, [refetch]);

  const renderEmpty = useMemo(() => {
    if (isFetching) {
      return null;
    }
    return (
      <EmptyStateScreen
        icon={images.img_subcatempty}
        primaryText="No Subcategories Found"
        message="Click on the “+ New Category”"
        nextMessage=" below to add new item."
      />
    );
  }, [isFetching]);

  const processedData = useMemo(() => {
    const q = debouncedSearch?.trim()?.toLowerCase();

    if (!q) return subCategoryListData ?? [];

    return (subCategoryListData ?? []).filter(item =>
      item?.name?.toLowerCase()?.includes(q),
    );
  }, [subCategoryListData, debouncedSearch]);

  const renderItem: ListRenderItem<SubCategoriesPayload> = useCallback(
    ({ item }) => {
      return <RenderSubCategories item={item} />;
    },
    [],
  );

  const renderFooter = useCallback(() => {
      return isFetchingNextPage && <ActivityIndicator size="small" />;
    }, [isFetchingNextPage]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header
          txt={t('settings.inventorySetup.subcategories')}
          borderBottomEnabled
        />

        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />

            <AppInput
              style={styles.noBorderInput}
              placeholder={t('inputs.search.subcategories')}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={processedData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatlist}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt={t('button.subCategory')}
            txtColor={theme.primaryText}
            gap={8}
            onPress={() => navigation.navigate('NewSubCategoryScreen')}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </AppButton>
        </View>
      </View>
      <Loader visible={ isPending } />
    </LinearGradient>
  );
};

export default SubCategoriesScreen;
