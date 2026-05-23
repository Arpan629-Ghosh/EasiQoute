import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { CategoriesScreenProps } from '@/types/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '@/hooks/apis/useSettings';
import { useToast } from '@/hooks/useToast';
import { CreateCategoriesPayload } from '@/types/apis/settings.types';
import RenderCategories from '@/components/renderCategories/RenderCategories';
import { useDebounce } from '@/hooks/useDebounce';
import CategoryEmptyScreen from '@/components/emptyScreenComponents/CategoryEmptyScreen';

const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  const [categories, setCategories] = useState<CreateCategoriesPayload[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const { theme } = useAppTheme();
  const { fetchCategories, data, current_page, last_page, error } = useSettings();
  const { showToast } = useToast();

  const debouncedSearch = useDebounce(search);

  const insets = useSafeAreaInsets();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToNewCategory = () => {
    navigation.navigate('NewCategoryScreen');
  };

  const handleFetchCategories = useCallback((pageNumber = 1) => {
    if (loading) return;
    fetchCategories(pageNumber);
  },[loading, fetchCategories]);

  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    setLoading(true);
    page.current += 1;
    handleFetchCategories(page.current);
  };

  const handleRefresh = () => {
    page.current = 1;
    setRefreshing(true);
    setHasMore(true);
    handleFetchCategories(1);
  };

  useEffect(() => {
    setLoading(true);
    handleFetchCategories(1);
  }, [handleFetchCategories]);

  useEffect(() => {
    if (!data) return;
    setCategories(prev => (page.current === 1 ? data : [...prev, ...data]));
    setHasMore(current_page < last_page);
    setLoading(false);
    setRefreshing(false);
  }, [data, current_page, last_page]);

  useEffect(() => {
    if (!error) return;
    showToast(String(error), 'error');
    setLoading(false);
    setRefreshing(false);
  }, [error, showToast]);

  const processedData = useMemo(() => {
    let result = [...categories];

    if (!debouncedSearch.trim()) {
      return result;
    }

    const lower = debouncedSearch.toLowerCase();

    result = result.filter(item => item?.name?.toLowerCase()?.includes(lower));

    return result;
  }, [categories, debouncedSearch]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Categories" borderBottomEnabled={true} />

        <View style={styles.inpContainer}>
          <View style={styles.inputicon}>
            <Image source={icons.ic_search} style={styles.searchic} />

            <Input
              style={styles.noBorderInput}
              placeholder="Search ‘Categories’"
              returnKeyType="search"
              value={search}
              onChangeText={txt => setSearch(txt)}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={processedData}
        renderItem={({ item }) => <RenderCategories item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            handleLoadMore();

            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && page.current > 1 ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        ListEmptyComponent={<CategoryEmptyScreen/>}
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
