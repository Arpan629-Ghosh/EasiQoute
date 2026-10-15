import {
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightSemiBold from '@/components/ui/appFonts/InterTightSemiBold';
import AppInput from '@/components/ui/appInput/AppInput';
import { icons } from '@/config/icons';
import FilterAndSorting from '@/components/filterAndSorting/FilterAndSorting';
import { InvoiceStackProps } from '@/types/navigation.types';
import RenderInvoices from '@/components/flatlist/renderInvoices/RenderInvoices';
import { InvoiceListItem } from '@/types/apis/invoice.types';
import { useDebounce } from '@/hooks/useDebounce';
import Loader from '@/components/ui/loader/Loader';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';
import { useInvoiceList } from '@/hooks/apis/invoice/useInvoiceList';

interface FilterAndSortingType {
  startDate: string;
  endDate: string;
  statuses: string[];
  amount: string;
}

const InvoiceScreen = ({ navigation }: InvoiceStackProps<'InvoiceScreen'>) => {
  const [search, setSearch] = useState<string>('');
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterData, setFliterData] = useState<FilterAndSortingType>({
    startDate: '',
    endDate: '',
    statuses: [],
    amount: '',
  });
  const [appliedData, setAppliedData] = useState<FilterAndSortingType | null>(
    null,
  );

  const [refreshing, setRefreshing] = useState(false);

  const { theme, isDark } = useAppTheme();
  const {
    invoiceListData,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInvoiceList();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const debouncedSearch = useDebounce(search);

  const navigateToSelectQuoteScreen = () => {
    navigation.navigate('SelectQuoteScreen');
  };

  const handleSearchInput = useCallback((txt: string) => {
    setSearch(txt);
  }, []);

  const handleCloseFilterModal = useCallback(() => {
    setAppliedData(filterData);
    setOpenFilterModal(false);
  }, [filterData]);

  const togglestatuse = useCallback((type: string) => {
    setFliterData(prev => {
      const isSelected = prev.statuses.includes(type);

      return {
        ...prev,
        statuses: isSelected
          ? prev.statuses.filter(item => item !== type)
          : [...prev.statuses, type],
      };
    });
  }, []);

  const toggleAmount = useCallback((type: string) => {
    setFliterData(prev => ({
      ...prev,
      amount: prev.amount === type ? '' : type,
    }));
  }, []);

  const fillStartInput = useCallback((startDate: string) => {
    setFliterData(prev => ({
      ...prev,
      startDate,
    }));
  }, []);

  const fillEndInput = useCallback((endDate: string) => {
    setFliterData(prev => ({
      ...prev,
      endDate,
    }));
  }, []);
  const handleClear = useCallback(() => {
    setFliterData({
      startDate: '',
      endDate: '',
      statuses: [],
      amount: '',
    });

    setAppliedData(null);
    setOpenFilterModal(false);
  }, []);

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

  const renderEmpty = useCallback(() => {
    if (isFetching) {
      return null;
    }

    return (
      <EmptyStateScreen
        icon={isDark ? images.img_darkquote : icons.ic_boldqoute}
        primaryText="No Invoices Found"
        message="Click on the + below to create"
        nextMessage="a new quote."
      />
    );
  }, [isFetching, isDark]);

  const renderFooter = useCallback(() => {
    return isFetchingNextPage && <ActivityIndicator size="small" />;
  }, [isFetchingNextPage]);

  const keyExtractor = useCallback(
    (item: InvoiceListItem) => item.id.toString(),
    [],
  );

  const renderItem = useCallback(({ item }: { item: InvoiceListItem }) => {
    return <RenderInvoices item={item} />;
  }, []);

  const processedData = useMemo(() => {
    let result = invoiceListData;
    if (!appliedData && !debouncedSearch.trim()) {
      return result;
    }
    const { statuses, amount, startDate, endDate } = appliedData || {};
    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();
      result = result.filter(item => {
        const title = (item?.title || '').toLowerCase();
        const name = (item?.name || '').toLowerCase();
        const reference = (item?.reference_number || '').toLowerCase();
        const status = (item?.status || '').toLowerCase();

        return (
          title.includes(lower) ||
          name.includes(lower) ||
          reference.includes(lower) ||
          status.includes(lower)
        );
      });
    }
    if (statuses && statuses.length > 0) {
      const normalizedStatuses = statuses.map(status =>
        status.trim().toLowerCase(),
      );
      result = result.filter(item => {
        const itemStatus = (item?.status || '').trim().toLowerCase();
        return normalizedStatuses.includes(itemStatus);
      });
    }
    if (startDate || endDate) {
      const parseFilterDate = (date: string) => {
        const [day, month, year] = date.split('-');
        return new Date(`${year}-${month}-${day}`);
      };
      const start = startDate ? parseFilterDate(startDate) : null;
      const end = endDate ? parseFilterDate(endDate) : null;
      result = result.filter(item => {
        if (!item?.expiry_date) {
          return true;
        }
        const itemDate = new Date(item.expiry_date);
        if (start && itemDate < start) {
          return false;
        }
        if (end && itemDate > end) {
          return false;
        }
        return true;
      });
    }
    if (amount) {
      result = [...result].sort((a, b) => {
        const priceA = Number(a?.price || 0);
        const priceB = Number(b?.price || 0);

        return amount === 'Low to High' ? priceA - priceB : priceB - priceA;
      });
    }
    return result;
  }, [appliedData, debouncedSearch, invoiceListData]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View
              style={[styles.headerComponent, { paddingTop: insets.top + 12 }]}
            >
              <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
                Invoices
              </InterTightSemiBold>

              <View style={styles.searchandfilter}>
                <View style={styles.inputicon}>
                  <Image
                    source={icons.ic_whitesearch}
                    style={styles.searchic}
                  />

                  <AppInput
                    bg={theme.searchInput}
                    style={styles.noBorderInput}
                    placeholder="Search here"
                    value={search}
                    onChangeText={handleSearchInput}
                  />
                </View>

                <View style={styles.imgView}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setOpenFilterModal(true)}
                  >
                    <Image
                      source={isDark ? icons.ic_darksf : icons.ic_filter}
                      style={styles.img}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <FlatList
            data={processedData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flat}
            style={styles.flatlist}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReached={handleLoadMore}
          />
          <View style={styles.add}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={navigateToSelectQuoteScreen}
            >
              <Image source={icons.ic_add} style={styles.ic} />
            </TouchableOpacity>
          </View>
        </View>
        <FilterAndSorting
          visible={openFilterModal}
          onClose={handleCloseFilterModal}
          onClear={handleClear}
          selectedStatus={filterData.statuses}
          selectedAmount={filterData.amount}
          startDate={filterData.startDate}
          endDate={filterData.endDate}
          fillStartInput={fillStartInput}
          fillEndInput={fillEndInput}
          onToggleStatus={togglestatuse}
          onToggleAmount={toggleAmount}
        />
        <Loader visible={isPending} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default InvoiceScreen;
