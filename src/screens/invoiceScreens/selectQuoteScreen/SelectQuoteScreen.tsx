import { useAppTheme } from '@/hooks/useAppTheme';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, View } from 'react-native';
import AppButton from '@/components/appButton/AppButton';
import { RootScreenProps } from '@/types/navigation.types';
import { useQuotes } from '@/hooks/apis/useQuotes';
import SelectQuote from '@/components/selectQuote/SelectQuote';
import { QuoteItem } from '@/types/apis/quote.types';
import Loader from '@/components/loader/Loader';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { icons } from '@/config/icons';

const SelectQuoteScreen = ({
  navigation, route
}: RootScreenProps<'SelectQuoteScreen'>) => {

  const [selectedQuote, setSelectedQuote] = useState<number | undefined>()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [paginationLoading, setPaginationLoading] = useState(false)
  const page = useRef(1);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {
    fetchQuotesScreenData,
    quoteList,
    loadingQuoteList,
    current_page,
    last_page,
  } = useQuotes();


  const invoiceDetails = route.params?.invoiceDetails;
  const linkedQuoteId = route.params?.invoiceDetails?.quote?.id

  console.log("invoiceDetails: ", invoiceDetails)

  useEffect(() => {
    page.current = 1;
    fetchQuotesScreenData(1)
  }, [fetchQuotesScreenData])

  useEffect(() => {
    if (linkedQuoteId !== undefined) {
      setSelectedQuote(linkedQuoteId);
    }
  }, [linkedQuoteId]);

  

  const keyExtractor = useCallback((item: QuoteItem) => item.id.toString(), []);

  const onToggle = useCallback((item: QuoteItem) => {
    setSelectedQuote(prev => prev === item.id ? undefined : item.id)
  }, [])

  const renderItem = useCallback(({ item }: { item: QuoteItem }) => {
    return <SelectQuote
      item={item}
      isSelected={selectedQuote === item.id }
      onToggle={onToggle}
    />
  }, [onToggle, selectedQuote])

  const renderEmpty = useCallback(() => {
    if (loadingQuoteList) {
      return null;
    }

    return (
      <EmptyStateScreen
        icon={icons.ic_boldqoute}
        primaryText="No Quotes Found"
        message="Create your first quote"
        butttonEnabled={true}
      />
    );
  }, [loadingQuoteList]);

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
  }, [refreshing, fetchQuotesScreenData])
  
  const handleLoadMore = useCallback( async () => {
    if (paginationLoading || refreshing || !hasMore) {
      return;
    }
    
    try {
      setPaginationLoading(true);
      page.current = page.current + 1;
      await fetchQuotesScreenData(page.current)
    } finally {
      setPaginationLoading(false)
    }
  }, [fetchQuotesScreenData, refreshing, hasMore, paginationLoading])
  
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

  const navigateToNewInvoiceScreens = () => {
    navigation.navigate('NewInvoiceScreens', {
      invoiceDetails: invoiceDetails || undefined,
      quoteId: selectedQuote
    });
  };
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <Header txt="Select Quote" borderBottomEnabled={true} />

      <View style={styles.content}>
        <FlatList
          data={quoteList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flat}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              handleLoadMore();
              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          ListEmptyComponent={renderEmpty}
        />
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt="Continue"
            txtColor={theme.primaryText}
            onPress={navigateToNewInvoiceScreens}
          />
        </View>
      </View>
      <Loader visible={ loadingQuoteList} />
    </LinearGradient>
  );
};

export default SelectQuoteScreen;
