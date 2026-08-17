import { View, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useMemo } from 'react';
import { RootScreenProps } from '@/types/navigation.types';
import { usePaymentDetails } from '@/hooks/apis/usePaymentDetails';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '@/config/icons';
import { images } from '@/config/images';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import Card from '@/components/cardDetailsComponent/Card';
import { PAYMENT_STATUS_COLORS } from '@/config/statusColors';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import { formatDate } from '@/utils/formatDate';
import AppButton from '@/components/appButton/AppButton';
import { Allocation } from '@/types/apis/payments.types';
import RenderAllocation from '@/components/renderAllocation/RenderAllocation';
import Loader from '@/components/loader/Loader';

const PaymentDetailsScreen = ({
  route, navigation
}: RootScreenProps<'PaymentDetailsScreen'>) => {
  const paymentId = route.params.paymentId;
  const {
    paymentDetails,
    isPaymentDetailsPending,
    
  } = usePaymentDetails(paymentId);

  const insets = useSafeAreaInsets();

  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const statusColors = PAYMENT_STATUS_COLORS[
    paymentDetails?.status as keyof typeof PAYMENT_STATUS_COLORS
  ] || {
    view: '#E8ECF4',
    text: '#64748B',
  };

  const renderItem = ({ item }: { item: Allocation }) => {
    return <RenderAllocation item={item}/>
  }

  const navigateToBack = () => {
    navigation.goBack();
  }
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      {isDark ? (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      ) : (
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
      )}
      <View style={[styles.headerComponent, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={navigateToBack}>
          <Image
            source={isDark ? icons.ic_backwhite : icons.ic_back}
            style={styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.img_deletepay} style={styles.img} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
          Payment ID: {paymentDetails?.id}
        </InterTightMedium>
        <Card>
          <View style={styles.topCard}>
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              {paymentDetails?.client_name}
            </InterTightRegular>
            <View
              style={[styles.status, { backgroundColor: statusColors.view }]}
            >
              <InterTightMedium fsize={12} fcolor={statusColors.text}>
                {paymentDetails?.status}
              </InterTightMedium>
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.inforow}>
            <View style={styles.infocard}>
              <Image
                source={isDark ? icons.ic_darkbg1 : icons.ic_badge1}
                style={styles.img}
              />
              <CardHeader title="Basic Information" />
            </View>

            <InfoRow label="Amount" value={`£${paymentDetails?.amount}`} />
            <InfoRow
              label="Created On"
              value={formatDate(paymentDetails?.date)}
            />
            <InfoRow label="Type" value={paymentDetails?.type} />
            <InfoRow label="Method" value={paymentDetails?.method} />
            <InfoRow
              label="Credit Remaining"
              value={`£${paymentDetails?.credit_remaining}`}
            />
          </View>
        </Card>
        <View style={styles.allocationHeader}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            Allocation
          </InterTightMedium>
          <View style={ styles.border} />
        </View>
      </View>
      <FlatList
        data={paymentDetails?.allocations}
        renderItem={renderItem}
        style={styles.flat}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
       <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
              <View style={styles.footeritem}>
                <AppButton
                  bg={theme.background}
                  bttnTxt="Share"
                  borderwidth={1}
                  borderc="#082B60"
                  txtColor={theme.textPrimary}
                  gap={8}
                  // onPress={handleShare}
                >
                  <Image source={icons.ic_share} style={styles.addicon} />
                </AppButton>
              </View>
      </View>
      <Loader visible={isPaymentDetailsPending} />
    </LinearGradient>
  );
};

export default PaymentDetailsScreen;
