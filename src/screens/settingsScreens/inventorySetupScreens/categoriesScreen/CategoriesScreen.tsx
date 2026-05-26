import React, {
  useCallback,
  useMemo,
  useRef,
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
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import RenderCategories from '@/components/renderCategories/RenderCategories';
import CategoryEmptyScreen from '@/components/emptyScreenComponents/CategoryEmptyScreen';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useDebounce } from '@/hooks/useDebounce';
import { useSettings } from '@/hooks/apis/useSettings';
import { createStyles } from './style';
import { CategoriesScreenProps } from '@/types/navigation.types';
import { CreateCategoriesPayload } from '@/types/apis/settings.types';
import { useFocusEffect } from '@react-navigation/native';

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  const [paginationLoading, setPaginationLoading] = useState(false);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();

  const {
    fetchCategories,
    data,
    current_page,
    last_page,
    settingLoading,
    isStale
  } = useSettings();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const debouncedSearch = useDebounce(search);

  useFocusEffect(
    useCallback(() => {
      if (isStale || !data.length) {
        page.current = 1;
        fetchCategories(1);
      }
    }, [isStale, data.length, fetchCategories]),
  );


  const hasMore = useMemo(() => {
    return current_page < last_page;
  }, [current_page, last_page]);
  
  const handleRefresh = useCallback(async () => {
    if (refreshing) {
      return;
    }
    page.current = 1;
    setRefreshing(true);
    await fetchCategories(1);
    setRefreshing(false);
  }, [refreshing, fetchCategories]);

  const handleLoadMore = useCallback(async () => {
    if (paginationLoading || refreshing || !hasMore) {
      return;
    }
    try {
      setPaginationLoading(true);
      const nextPage = page.current + 1;
      page.current = nextPage;
      await fetchCategories(nextPage);
    } finally {
      setPaginationLoading(false);
    }
  }, [paginationLoading, refreshing, hasMore, fetchCategories]);

  const processedData = useMemo(() => {
    const trimmedSearch = debouncedSearch?.trim()?.toLowerCase();
    if (!trimmedSearch) {
      return data ?? [];
    }
    return (data ?? []).filter(item =>
      item?.name?.toLowerCase()?.includes(trimmedSearch),
    );
  }, [data, debouncedSearch]);


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
    return <CategoryEmptyScreen />;
  }, [settingLoading]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Categories" borderBottomEnabled />

        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />
            <Input
              style={styles.noBorderInput}
              placeholder="Search ‘Categories’"
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
      
      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="New Category"
            txtColor={theme.primaryText}
            gap={8}
            onPress={navigateToNewCategory}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CategoriesScreen;
