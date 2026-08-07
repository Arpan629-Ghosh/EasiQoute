import {
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  View,
} from 'react-native';
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
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiscountModal from '@/components/discountModal/DiscountModal';
import { InvoiceTopTabWithRootProps } from '@/types/navigation.types';
import RenderSubCategoriesDropDown from '@/components/renderSubCategoriesDropdown/RenderSubCategoriesDropDown';
import { useSettings } from '@/hooks/apis/useSettings';
import { useDebounce } from '@/hooks/useDebounce';
import RenderFilterData from '@/components/renderFilterData/RenderFilterData';
import { FetchItemsData } from '@/types/apis/settings.types';
import { useInvoice } from '@/hooks/apis/useInvoice';
import { useToast } from '@/hooks/useToast';
import MarginBottomSheet from '@/components/marginBottomSheet/MarginBottomSheet';

interface FinancialBreakDown {
  subtotal: string;
  tax: string;
  total: string;
}

const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];
const ItemsScreen = ({
  navigation,
  route,
}: InvoiceTopTabWithRootProps<'Items'>) => {
  const [selectedFilterOption, setSelectFilterOption] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<FetchItemsData[]>([]);

  const [openDropDown, setOpenDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFinancialBreakdown, setOpenFinancialBreakdown] =
    useState<boolean>(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const insets = useSafeAreaInsets();
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const { theme } = useAppTheme();
  const {
    items_data,
    subcat_data,
    items_current_page,
    items_last_page,
    fetchItems,
  } = useSettings();
  const { loadingInvoiceUpdate, invoiceDetails, updateInvoice, getInvoiceDetails } = useInvoice();
  const { showToast } = useToast();
  const debouncedSearch = useDebounce(search);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const invoiceId = route.params?.invoiceId;
  const invoiceItems = route.params?.invoiceItems;
  console.log('invoiceId: ', invoiceId);
  console.log('items: ', invoiceItems);

  useEffect(() => {
    height.value = withTiming(openFinancialBreakdown ? 500 : 0, {
      duration: 300,
    });

    opacity.value = withTiming(openFinancialBreakdown ? 1 : 0, {
      duration: 250,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFinancialBreakdown]);

  useEffect(() => {
    if (!invoiceItems?.length) return;

    const mapped = invoiceItems.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total_price: item.total_price,
      total_cost: item.total_cost,
      category_name: item.category_name,
      subcategory_name: item.subcategory_name,
      unit: item.unit,
      cost: item.cost,
      is_added: true,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      type: item.type,
    }));

    setSelectedItems(mapped);
  }, [invoiceItems]);

  const navigateToNewItem = () => {
    navigation.navigate('NewItemsScreen');
  };

  const toggleFinancialMargin = () => {
    setOpenFinancialBreakdown(!openFinancialBreakdown);
  };

  const handleCloseDiscount = useCallback(() => {
    setOpenDiscount(false);
  }, []);

  const discountValue = (discount: number) => {
    setDiscountPrice(discount);
  };

  const handleInput = useCallback((txt: string) => {
    setSearch(txt);
    if (txt.trim()) setOpenDropDown(true);
  }, []);

  const handlePress = useCallback((category: string) => {
    setSearch(category);
    setOpenDropDown(false);
  }, []);

  const handleFilterOption = (option: string) => {
    const isSelected = selectedFilterOption.includes(option);
    isSelected ? setSelectFilterOption('') : setSelectFilterOption(option);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: height.value,
      opacity: opacity.value,
      overflow: 'hidden',
    };
  });

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

  const handleAddItem = useCallback((updatedItem: FetchItemsData) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === updatedItem.id);

      if (exists) {
        return prev.map(i => (i.id === updatedItem.id ? updatedItem : i));
      }

      return [...prev, updatedItem];
    });
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setSelectedItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const renderItems: ListRenderItem<FetchItemsData> = useCallback(
    ({ item }) => {
      const selectedItem = selectedItems.find(i => i.id === item.id);

      return (
        <RenderFilterData
          item={item}
          selectedItem={selectedItem}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />
      );
    },
    [handleAddItem, handleRemoveItem, selectedItems],
  );

  const calculateFinancialBreakdown = useMemo(() => {
    let result: FinancialBreakDown = {
      subtotal: '',
      tax: '',
      total: '',
    };
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );
    const tax = subtotal * (8 / 100);
    const total = subtotal + tax;
    const grandTotal = total - (total * discountPrice) / 100;

    result.subtotal = subtotal.toFixed(2);
    result.tax = tax.toFixed(2);
    result.total = grandTotal.toFixed(2);
    return result;
  }, [selectedItems, discountPrice]);

  const handleUpdateInvoice = async () => {
    if (typeof invoiceId !== 'number') {
      showToast('Invalid invoice id!', 'error');
      return;
    }
    try {
      await updateInvoice({
        invoice_id: invoiceId,
        discount: discountPrice,
        invoice_items: selectedItems,
      });
      showToast('Invoice updated successfully!');
      await getInvoiceDetails(invoiceId);
      navigation.navigate('Preview', {
        previewUrl: invoiceDetails?.url
      })
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  console.log('SelectedItems: ', selectedItems)

  return (
    <LinearGradient
      colors={theme.gradientPrimary}
      style={styles.linearGradient}
    >
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

              <TouchableOpacity>
                <InfoRow
                  label="Available Credit"
                  value="Apply Credit"
                  activeColor={true}
                />
              </TouchableOpacity>

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
                  value="+ Add Discount"
                  activeColor={true}
                />
              </TouchableOpacity>

              <View style={styles.empty} />

              <InfoRow
                label="Grand Total"
                value={`£${calculateFinancialBreakdown.total}`}
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
              buttonWidth="48.5%"
              gap={8}
            >
              <Image source={icons.ic_blueadd} style={styles.icn} />
            </ButtonComponent>

            <ButtonComponent
              bg={theme.primary}
              bttnTxt="Save & Preview"
              txtColor={theme.primaryText}
              buttonWidth="48.5%"
              showLoader={loadingInvoiceUpdate}
              onPress={handleUpdateInvoice}
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
    </LinearGradient>
  );
};

export default ItemsScreen;
