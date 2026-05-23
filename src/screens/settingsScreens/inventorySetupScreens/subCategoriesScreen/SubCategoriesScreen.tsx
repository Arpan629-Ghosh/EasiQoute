import { View, Image, FlatList } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import { icons } from '@/config/icons';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { SubCategoriesScreenProps } from '@/types/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubCategoriesPayload } from '@/types/apis/settings.types';
import { useDebounce } from '@/hooks/useDebounce';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import RenderSubCategories from '@/components/renderSubCategories/RenderSubCategories';
import SubCategoryEmptyScreen from '@/components/emptyScreenComponents/SubCategoryEmptyScreen';

const SubCategoriesScreen = ({ navigation }: SubCategoriesScreenProps) => {
  const [subCategories, setSubCategories] = useState<SubCategoriesPayload[]>(
    [],
  );
  const [search, setSearch] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true)
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();
  const debouncedSearch = useDebounce(search)

  const {
    fetchSubCategories,
    subcat_data,
    subcat_last_page,
    subcat_current_page,
    error,
  } = useSettings()
  const navigateToNewSubCategory = () => {
    navigation.navigate('NewSubCategoryScreen');
  };


  const handleFetchSubCategories = useCallback(
    async (pageNumber = 1) => {
      try {
        await fetchSubCategories(pageNumber);
      } catch (err) {
        showToast(String(err), 'error')
      }
    },
    [fetchSubCategories,showToast],
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setInitialLoading(true);
      page.current = 1;
      await handleFetchSubCategories(1);
      setInitialLoading(false);
    };
    fetchInitialData();
  }, [handleFetchSubCategories]);



  useEffect(() => {
    if (!subcat_data) return;
    setSubCategories(prev => {
      if (page.current === 1) {
        return subcat_data;
      }
      const merged = [...prev, ...subcat_data];
      const unique = merged.filter(
        (item, index, self) => index === self.findIndex(t => t.id === item.id),
      );
      return unique;
    });
    setHasMore(subcat_current_page < subcat_last_page);
    setInitialLoading(false);
    setPaginationLoading(false);
    setRefreshing(false);
  }, [subcat_data, subcat_current_page, subcat_last_page]);

  useEffect(() => {
    if (!error) return;
    showToast(String(error), 'error');
    setInitialLoading(false);
    setPaginationLoading(false);
    setRefreshing(false);
  }, [error, showToast]);

  const handleLoadMore = async () => {
    if (paginationLoading || refreshing || initialLoading || !hasMore) {
      return;
    }
    setPaginationLoading(true);
    const nextPage = page.current + 1;
    page.current = nextPage;
    await handleFetchSubCategories(nextPage);
  };


  const handleRefresh = async () => {
    setRefreshing(true);
    page.current = 1;
    setHasMore(true);
    await handleFetchSubCategories(1);
  };

  const processedData = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return subCategories;
    }
    const lower = debouncedSearch.toLowerCase();
    return subCategories.filter(item =>
      item?.name?.toLowerCase()?.includes(lower),
    );
  }, [subCategories, debouncedSearch]);

  const renderItem = useCallback(({ item }: { item: SubCategoriesPayload }) => {
    return <RenderSubCategories item={item} />;
  }, []);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
  

      <View style={styles.header}>
        <Header txt="Subcategories" borderBottomEnabled={true} />

        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />

            <Input
              style={styles.noBorderInput}
              placeholder="Search 'Subcategories'"
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
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshing={refreshing}
        onRefresh={handleRefresh}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            onEndReachedCalledDuringMomentum.current = true;

            handleLoadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<SubCategoryEmptyScreen/>}
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
            bttnTxt="New Subcategory"
            txtColor={theme.primaryText}
            gap={8}
            onPress={navigateToNewSubCategory}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SubCategoriesScreen;
