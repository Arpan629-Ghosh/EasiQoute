import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import { createStyles } from './Styles';
import { usePayments } from '@/hooks/apis/usePayments';
import { useDebounce } from '@/hooks/useDebounce';
import { Data } from '@/types/apis/payments.types';
import RenderPaymentList from '@/components/renderPaymentList/RenderPaymentList';
import Loader from '@/components/loader/Loader';
import { PaymentStackProps } from '@/types/navigation.types';
import EmptyStateScreen from '@/components/emptyStateScreen/EmptyStateScreen';
import { images } from '@/config/images';

const PaymentsScreen = ({navigation} : PaymentStackProps<"PaymentsScreen">) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search);

  const {
    paymentLists,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = usePayments({
    search: debouncedSearch,
  });

  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem: ListRenderItem<Data> = useCallback(
    ({ item }) => <RenderPaymentList item={item} />,
    [],
  );

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View
            style={[
              styles.headerComponent,
              {
                paddingTop: insets.top + 12,
              },
            ]}
          >
            <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
              Payments
            </InterTightSemiBold>

            <View style={styles.inputicon}>
              <Image source={icons.ic_whitesearch} style={styles.searchic} />

              <AppInput
                bg={theme.searchInput}
                style={styles.noBorderInput}
                placeholder="Search payment id or clients"
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>
        </View>

        <FlatList<Data>
          data={paymentLists}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          style={styles.flatlist}
          contentContainerStyle={styles.flat}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshing={isFetching && !isFetchingNextPage && !isPending}
          onRefresh={handleRefresh}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" style={styles.footer} />
            ) : null
          }
          ListEmptyComponent={
            <EmptyStateScreen
              icon={images.img_paymentEmpty}
              primaryText="No Payments Recorded"
              message="Click on the + below to record"
              nextMessage="new payment."
            />
          }
        />

        <View style={styles.add}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RecordPaymentScreen')}
          >
            <Image source={icons.ic_add} style={styles.ic} />
          </TouchableOpacity>
        </View>
      </View>

      <Loader visible={isPending} />
    </LinearGradient>
  );
};

export default PaymentsScreen;
