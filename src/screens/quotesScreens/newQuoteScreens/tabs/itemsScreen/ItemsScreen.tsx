import { FlatList, Image, ListRenderItem, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import RenderSubCategoriesDropDown from '@/components/renderSubCategoriesDropdown/RenderSubCategoriesDropDown';
import { useDebounce } from '@/hooks/useDebounce';
import DiscountModal from '@/components/discountModal/DiscountModal';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FetchItemsData } from '@/types/apis/settings.types';
import { useQuotes } from '@/hooks/apis/useQuotes';
import { useToast } from '@/hooks/useToast';

interface FinancialBreakDown {
  subtotal: string;
  tax: string;
  total: string;
}

const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];


const ItemsScreen = ({ navigation }: ItemScreenProps) => {
  const [openFinancialBreakdown, setOpenFinancialBreakdown] =
    useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<FetchItemsData[]>([])
  const [selectedFilterOption, setSelectFilterOption] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false)
  const [search, setSearch] = useState('');
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0)
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const debouncedSearch = useDebounce(search);

  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const {
    fetchItems,
    isStale,
    items_data,
    subcat_data,
    items_current_page,
    items_last_page,
  } = useSettings();
  const { updateQuote, loading } = useQuotes();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    height.value = withTiming(openFinancialBreakdown ? 500 : 0, {
      duration: 300,
    });

    opacity.value = withTiming(openFinancialBreakdown ? 1 : 0, {
      duration: 250,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFinancialBreakdown]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: height.value,
      opacity: opacity.value,
      overflow: 'hidden',
    };
  });

  useEffect(() => {
    if (isStale) {
      page.current = 1;
      fetchItems(1);
    }
  }, [fetchItems, isStale])

  useEffect(() => {
    fetchItems(1);
  }, [fetchItems])

  // useFocusEffect(
  //   useCallback(() => {
  //     if (isStale || !items_data.length) {
  //       page.current = 1;
  //       fetchItems(1);
  //     }
  //   }, [fetchItems, isStale, items_data]),
  // );

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


  const handleCloseDiscount = useCallback(() => {
    setOpenDiscount(false)
  }, [])

  const processedData = useMemo(() => {
    let result = items_data;
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


  const handleAddItem = useCallback((updatedItem: FetchItemsData) => {
    setSelectedItems(prev => {
      const alreadyExists = prev.find(item => item.id === updatedItem.id);

      if (alreadyExists) {
        return prev.map(item =>
          item.id === updatedItem.id ? updatedItem : item,
        );
      }

      return [...prev, updatedItem];
    });
  }, []);
  
  const discountValue = (discount: number) => {
    setDiscountPrice(discount)
  }
  
  console.log(selectedItems);

  const renderItems: ListRenderItem<FetchItemsData> = useCallback(({ item }) => {
    return (
      <RenderFilterData
        item={item}
        onAddItem={handleAddItem}
      />
    );
  }, [handleAddItem]);

  const calculateFinancialBreakdown = useMemo(() => {
    let result: FinancialBreakDown = {
      subtotal: "",
      tax: "",
      total: ""
    };
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );
    const tax = subtotal * (8 / 100);
    const total = subtotal + tax;
    const grandTotal = total - (total * discountPrice/100)
  
    result.subtotal = subtotal.toFixed(2);
    result.tax = tax.toFixed(2);
    result.total = grandTotal.toFixed(2);
    return result;
  }, [selectedItems, discountPrice])

  const handleUpdateQuote = async() => {
    try {
      await updateQuote({
        quoteId: 3141,
        items: selectedItems,
      });
      showToast('Quote updated successfully!')
    } catch (error) {
      showToast(String(error), 'error')
    }
  }

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
          renderItem={renderItems}
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
          <Animated.View style={[styles.inforow, animatedStyle]}>
            <>
              <InfoRow
                label="Subtotal"
                value={`£${calculateFinancialBreakdown.subtotal}`}
              />

              <TouchableOpacity onPress={() => setOpen(true)}>
                <InfoRow
                  label="Margin (50%)"
                  value="Check Margin"
                  activeColor={true}
                />
              </TouchableOpacity>

              <InfoRow
                label="Tax(8%)"
                value={`£${calculateFinancialBreakdown.tax}`}
              />

              <TouchableOpacity onPress={() => setOpenDiscount(true)}>
                <InfoRow
                  label="Discount"
                  value={discountPrice ? discountPrice : '+ Add Discount'}
                  activeColor={true}
                />
              </TouchableOpacity>

              <View style={styles.empty} />

              <InfoRow
                label="Grand Total"
                value={`£${calculateFinancialBreakdown.total}`}
              />

              <InfoRow
                label="Deposit"
                value="+ Add Deposit"
                activeColor={true}
              />

              <View style={styles.empty} />
            </>
          </Animated.View>
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
              showLoader={loading}
              onPress={handleUpdateQuote}
            />
          </View>
        </View>
      </View>
      <MarginBottomSheet
        visible={open}
        onClose={handleClose}
        margin_data={selectedItems}
      />
      <DiscountModal
        visible={openDiscount}
        onClose={handleCloseDiscount}
        onDiscount={discountValue}
      />
    </View>
  );
};

export default ItemsScreen;
