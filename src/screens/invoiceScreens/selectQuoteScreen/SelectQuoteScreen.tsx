import { useAppTheme } from '@/hooks/useAppTheme';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './style';
import Header from '@/components/ui/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, View } from 'react-native';
import AppButton from '@/components/ui/appButton/AppButton';
import { RootScreenProps } from '@/types/navigation.types';
import SelectQuote from '@/components/selectQuote/SelectQuote';
import { QuoteItem } from '@/types/apis/quote.types';
import Loader from '@/components/ui/loader/Loader';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { icons } from '@/config/icons';
import { useQuoteList } from '@/hooks/apis/quotes/useQuoteList';

const SelectQuoteScreen = ({
  navigation, route
}: RootScreenProps<'SelectQuoteScreen'>) => {

  const [selectedQuote, setSelectedQuote] = useState<number | undefined>()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { quoteListData, hasNextPage, isFetchingNextPage, isFetching, isPending, refetch, fetchNextPage } = useQuoteList();

  const invoiceDetails = route.params?.invoiceDetails;
  const linkedQuoteId = route.params?.invoiceDetails?.quote?.id

  console.log("invoiceDetails: ", invoiceDetails)



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
    if (isFetching) {
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
  }, [isFetching]);

  const handleRefresh = useCallback(async () => {
      try {
        setRefreshing(true);
        await refetch();
      } finally {
        setRefreshing(false);
      }
  }, [refetch])
  
  const handleLoadMore = useCallback( async () => {
    if (!hasNextPage || isFetchingNextPage || isFetching) {
      return;
    }
    
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage])
  
  const renderFooter = useCallback(() => {
    return isFetchingNextPage && <ActivityIndicator size="small" />;
  }, [isFetchingNextPage]);

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
          data={quoteListData}
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
      <Loader visible={ isPending} />
    </LinearGradient>
  );
};

export default SelectQuoteScreen;
