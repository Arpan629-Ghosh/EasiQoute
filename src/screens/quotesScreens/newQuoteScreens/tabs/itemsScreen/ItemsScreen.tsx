import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import RenderFilterData from '@/components/renderFilterData/RenderFilterData';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import MarginBottomSheet from '@/components/marginBottomSheet/MarginBottomSheet';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ItemScreenProps } from '@/types/navigation.types';
import { useSettings } from '@/hooks/apis/useSettings';
import { useFocusEffect } from '@react-navigation/native';
import RenderSubCategoriesDropDown from '@/components/renderSubCategoriesDropdown/RenderSubCategoriesDropDown';
import { useDebounce } from '@/hooks/useDebounce';

const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];
const ItemsScreen = ({ navigation }: ItemScreenProps) => {
  const [openFinancialBreakdown, setOpenFinancialBreakdown] =
    useState<boolean>(false);
  const [selectedFilterOption, setSelectFilterOption] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const insets = useSafeAreaInsets();
  const debouncedSearch = useDebounce(search);

  const { theme } = useAppTheme();
  const {
    fetchItems,
    isStale,
    items_data,
    subcat_data,
    items_current_page,
    items_last_page,
  } = useSettings();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useFocusEffect(
    useCallback(() => {
      if (isStale || !items_data.length) {
        page.current = 1;
        fetchItems(1);
      }
    }, [fetchItems, isStale, items_data]),
  );

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

  const toggleFinancialMargin = () => {
    setOpenFinancialBreakdown(!openFinancialBreakdown);
  };
  const handleFilterOption = (option: string) => {
    const isSelected = selectedFilterOption.includes(option);
    isSelected ? setSelectFilterOption('') : setSelectFilterOption(option);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const navigateToNewItem = () => {
    navigation.navigate('NewItemsScreen');
  };

  const handlePress = useCallback((category: string) => {
    setSearch(category);
    setOpenDropDown(false);
  }, []);

  const handleInput = useCallback((txt: string) => {
    setSearch(txt);
    if (txt.trim()) setOpenDropDown(true);
  }, []);

  const increaseCount = useCallback((id: number) => {
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }, []);

  const decreaseCount = useCallback((id: number) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  }, []);

  const processedData = useMemo(() => {
    let result = [...items_data];
    if (selectedFilterOption) {
      result = result.filter(item =>
        item.category_name
          .toLowerCase()
          .includes(selectedFilterOption.toLowerCase()),
      );
    }

    if (search.trim()) {
      result = result.filter(item =>
        item.subcategory_name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return result;
  }, [items_data, selectedFilterOption, search]);

  const processedSubcategoryData = useMemo(() => {
    let result = [...subcat_data];
    if (!debouncedSearch.trim()) return result;
    const lower = debouncedSearch.toLowerCase();
    result = result.filter(item => item.name.toLowerCase().includes(lower));
    return result;
  }, [subcat_data, debouncedSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filteritems}>
          {FilterOptions.map(items => {
            const isSelected = selectedFilterOption.includes(items);
            return (
              <TouchableOpacity
                onPress={() => handleFilterOption(items)}
                style={[
                  styles.filterbttn,
                  isSelected && styles.slectedfilterbttn,
                ]}
                key={items}
              >
                <InterTightRegular
                  fsize={14}
                  fcolor={isSelected ? '#082B60' : '#89909D'}
                >
                  {items}
                </InterTightRegular>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.input}>
          <Input
            placeholder="Search or select subcategory"
            style={styles.noBorderInput}
            value={search}
            onChangeText={txt => handleInput(txt)}
          />
          <TouchableOpacity onPress={() => setOpenDropDown(!openDropDown)}>
            <Image source={icons.ic_drop} style={styles.searchic} />
          </TouchableOpacity>
        </View>
      </View>
      {openDropDown && processedData.length > 0 && (
        <FlatList
          data={processedSubcategoryData}
          renderItem={({ item }) => (
            <RenderSubCategoriesDropDown
              item={item}
              onPress={() => handlePress(item.name)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.dropdown}
          contentContainerStyle={styles.ddcontainer}
          keyboardShouldPersistTaps="handled"
        />
      )}
      <View style={styles.flatlist}>
        <FlatList
          data={processedData}
          renderItem={({ item }) => (
            <RenderFilterData
              item={item}
              count={counts[item.id] || 0}
              increaseCount={() => increaseCount(item.id)}
              decreaseCount={() => decreaseCount(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          maxToRenderPerBatch={10}
          initialNumToRender={8}
          windowSize={5}
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
        />
      </View>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerComponent}>
          <View style={styles.txtContainer}>
            <TouchableOpacity
              style={styles.txt}
              onPress={toggleFinancialMargin}
            >
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                Financial breakdown
              </InterTightMedium>

              <Image
                source={openFinancialBreakdown ? icons.ic_down : icons.ic_close}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
          {openFinancialBreakdown && (
            <View style={styles.inforow}>
              <InfoRow label="Subtotal" value="£765.00" />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <InfoRow
                  label="Margin (50%)"
                  value="Check Margin"
                  activeColor={true}
                />
              </TouchableOpacity>

              <InfoRow label="Tax(8%)" value="£61.20" />
              <InfoRow
                label="Discount"
                value="+ Add Discount"
                activeColor={true}
              />
              <View style={styles.empty} />
              <InfoRow label="Grand Total" value="£749.70" />
              <InfoRow
                label="Deposit"
                value="+ Add Deposit"
                activeColor={true}
              />
              <View style={styles.empty} />
            </View>
          )}
          <View style={styles.bttnContainer}>
            <ButtonComponent
              borderc={theme.primary}
              bttnTxt="New Item"
              txtColor={theme.textPrimary}
              onPress={navigateToNewItem}
              borderwidth={1}
              buttonWidth={169.5}
              gap={8}
            >
              <Image source={icons.ic_blueadd} style={styles.icn} />
            </ButtonComponent>

            <ButtonComponent
              bg={theme.primary}
              bttnTxt="Save & Preview"
              txtColor={theme.primaryText}
              buttonWidth={169.5}
            />
          </View>
        </View>
      </View>
      <MarginBottomSheet visible={open} onClose={handleClose} />
    </View>
  );
};

export default ItemsScreen;
