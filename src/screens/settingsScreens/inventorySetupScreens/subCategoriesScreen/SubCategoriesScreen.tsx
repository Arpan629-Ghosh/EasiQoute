import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Image, FlatList, ListRenderItem, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import RenderSubCategories from '@/components/renderSubCategories/RenderSubCategories';
import SubCategoryEmptyScreen from '@/components/emptyScreenComponents/SubCategoryEmptyScreen';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDebounce } from '@/hooks/useDebounce';
import { useSettings } from '@/hooks/apis/useSettings';
import { createStyles } from './style';
import { SubCategoriesScreenProps } from '@/types/navigation.types';
import { SubCategoriesPayload } from '@/types/apis/settings.types';
import { useFocusEffect } from '@react-navigation/native';


const SubCategoriesScreen = ({ navigation }: SubCategoriesScreenProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {
    fetchSubCategories,
    isSubcatStale,
    subcat_data,
    subcat_current_page,
    subcat_last_page,
  } = useSettings();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const debouncedSearch = useDebounce(search);

  useFocusEffect(
    useCallback(() => {
      if (isSubcatStale || !subcat_data.length) {
        page.current = 1;
        fetchSubCategories(1);
      }
    }, [isSubcatStale, subcat_data.length, fetchSubCategories]),
  );


  const handleLoadMore = useCallback(async () => {
    if (
      paginationLoading ||
      refreshing ||
      subcat_current_page >= subcat_last_page
    ) {
      return;
    }

    try {
      setPaginationLoading(true);
      const nextPage = page.current + 1;
      page.current = nextPage;

      await fetchSubCategories(nextPage);
    } finally {
      setPaginationLoading(false);
    }
  }, [
    paginationLoading,
    refreshing,
    subcat_current_page,
    subcat_last_page,
    fetchSubCategories,
  ]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);
    page.current = 1;

    await fetchSubCategories(1);

    setRefreshing(false);
  }, [refreshing, fetchSubCategories]);

  const processedData = useMemo(() => {
    const q = debouncedSearch?.trim()?.toLowerCase();

    if (!q) return subcat_data ?? [];

    return (subcat_data ?? []).filter((item) =>
      item?.name?.toLowerCase()?.includes(q),
    );
  }, [subcat_data, debouncedSearch]);


  const renderItem: ListRenderItem<SubCategoriesPayload> = useCallback(({ item }) => {
    return <RenderSubCategories item={item} />;
  }, []);

  const renderFooter = useMemo(() => {
    if (!paginationLoading) return null;

    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [paginationLoading, styles.loaderContainer]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Subcategories" borderBottomEnabled />

        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />

            <Input
              style={styles.noBorderInput}
              placeholder="Search 'Subcategories'"
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
        ListEmptyComponent={<SubCategoryEmptyScreen />}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="New Subcategory"
            txtColor={theme.primaryText}
            gap={8}
            onPress={() => navigation.navigate('NewSubCategoryScreen')}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SubCategoriesScreen;
