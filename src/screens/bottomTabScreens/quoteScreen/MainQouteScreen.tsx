import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import FilterAndSorting from '@/components/filterAndSorting/FilterAndSorting';
import NoSubscription from '@/components/noSubscription/NoSubscription';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppTheme } from '@/hooks/useAppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { MainQuoteScreenProps } from '@/types/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuotes } from '@/hooks/apis/useQuotes';
import RenderQuotes from '@/components/renderQuotes/RenderQuotes';
import Loader from '@/components/loader/Loader';
import { useFocusEffect } from '@react-navigation/native';
import QuoteEmptyScreen from '@/components/emptyScreenComponents/QuoteEmptyScreen';
import { QuoteItem } from '@/types/apis/quote.types';

interface FilterAndSortingType {
  startDate: string;
  endDate: string;
  statuses: string[];
  amount: string;
}

const MainQuoteScreen = ({ navigation }: MainQuoteScreenProps) => {
  const [filterData, setFliterData] = useState<FilterAndSortingType>({
    startDate: '',
    endDate: '',
    statuses: [],
    amount: '',
  });

  const [appliedData, setAppliedData] = useState<FilterAndSortingType | null>(
    null,
  );

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();

  const {
    fetchQuotesScreenData,
    quoteList,
    loading,
    isFetchCall,
    current_page,
    last_page,
  } = useQuotes();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const debouncedSearch = useDebounce(search);

  useFocusEffect(
    useCallback(() => {
      if (isFetchCall || !(quoteList?.length ?? 0)) {
        page.current = 1;
        fetchQuotesScreenData(1);
      }
    }, [isFetchCall, quoteList, fetchQuotesScreenData]),
  );

  const navigateToNewQuote = useCallback(() => {
    navigation.navigate('NewQuoteScreens');
  }, [navigation]);

  const handleCloseFilterModal = useCallback(() => {
    setAppliedData(filterData);
    setOpenFilterModal(false);
  }, [filterData]);

  const handleCloseSubscriptionModal = useCallback(() => {
    setOpenSubscriptionModal(false);
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

  const handleSearchInput = useCallback((txt: string) => {
    setSearch(txt);
  }, []);

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

  const hasMore = useMemo(() => {
    return current_page < last_page;
  }, [current_page, last_page]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) {
      return;
    }
    try {
      setRefreshing(true);
      page.current = 1;
      await fetchQuotesScreenData(1);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, fetchQuotesScreenData]);

  const handleLoadMore = useCallback(async () => {
    if (paginationLoading || refreshing || !hasMore) {
      return;
    }
    try {
      setPaginationLoading(true);
      const nextPage = page.current + 1;
      page.current = nextPage;
      await fetchQuotesScreenData(nextPage);
    } finally {
      setPaginationLoading(false);
    }
  }, [paginationLoading, refreshing, hasMore, fetchQuotesScreenData]);

  const renderFooter = useCallback(() => {
    if (!paginationLoading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [paginationLoading, styles.loaderContainer]);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return null;
    }

    return <QuoteEmptyScreen />;
  }, [loading]);

  const keyExtractor = useCallback((item: QuoteItem) => item.id.toString(),
 []);

  const renderItem = useCallback(({ item }: { item: QuoteItem }) => {
    return <RenderQuotes item={item} />;
  }, []);

  const processedData = useMemo(() => {
    let result = [...(quoteList || [])];
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
  }, [appliedData, debouncedSearch, quoteList]);

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
                Quotes
              </InterTightSemiBold>

              <View style={styles.searchandfilter}>
                <View style={styles.inputicon}>
                  <Image
                    source={icons.ic_whitesearch}
                    style={styles.searchic}
                  />

                  <Input
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

          <View style={styles.flatlist}>
            {loading && !quoteList.length ? (
              <Loader visible />
            ) : (
              <FlatList
                data={processedData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flat}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                removeClippedSubviews
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                onEndReachedThreshold={0.2}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum.current = false;
                }}
                onEndReached={() => {
                  if (!onEndReachedCalledDuringMomentum.current) {
                    handleLoadMore();
                    onEndReachedCalledDuringMomentum.current = true;
                  }
                }}
              />
            )}
          </View>

          <View style={styles.add}>
            <TouchableOpacity activeOpacity={0.8} onPress={navigateToNewQuote}>
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

        <NoSubscription
          visible={openSubscriptionModal}
          onClose={handleCloseSubscriptionModal}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default MainQuoteScreen;
