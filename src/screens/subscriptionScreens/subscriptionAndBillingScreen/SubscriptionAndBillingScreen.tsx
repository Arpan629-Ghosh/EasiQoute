import { View } from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import Card from '@/components/cardDetailsComponent/Card';
import LinearGradient from 'react-native-linear-gradient';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppButton from '@/components/appButton/AppButton';
import { RootScreenProps } from '@/types/navigation.types';
import { formatDate } from '@/utils/formatDate';

const SubscriptionAndBillingScreen = ({
  route,
}: RootScreenProps<'SubscriptionAndBillingScreen'>) => {
    const isSubscriptionActive = route.params.isSubscriptionActive;
    const subscriptionEndDate = route.params.subscriptionEndDate
    const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.container}>
      <Header borderBottomEnabled={true} txt="Subscription & Billing" />
      <LinearGradient colors={theme.gradientPrimary} style={styles.lg}>
        <View style={styles.contentContainer}>
          <View style={styles.cardContainer}>
            {isSubscriptionActive ? (
              <Card style={styles.card}>
                <View style={styles.cardContainer}>
                  <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                    Pro Plan
                  </InterTightMedium>
                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    £49/month
                  </InterTightRegular>
                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    {`Subscription ends on ${formatDate(
                      subscriptionEndDate
                    )}`}
                  </InterTightRegular>
                </View>
                <AppButton
                  borderwidth={1}
                  bttnTxt="Cancel Plan"
                  txtColor={theme.textPrimary}
                  borderc={theme.border}
                />
              </Card>
            ) : (
              <Card style={styles.card}>
                <View style={styles.cardContainer}>
                  <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                    No Active Plan
                  </InterTightMedium>
                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    Your subscription ended on November 20, 2025
                  </InterTightRegular>
                </View>
                <AppButton
                  bg={theme.primary}
                  bttnTxt="Subscribe"
                  txtColor={theme.primaryText}
                />
              </Card>
            )}
            <Card style={styles.card}>
              <View style={styles.cardContainer}>
                <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                  Visa
                </InterTightMedium>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  •••• •••• •••• 4069
                </InterTightRegular>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  Expires on 21 August 2028
                </InterTightRegular>
              </View>
              <AppButton
                borderwidth={1}
                bttnTxt="Change"
                txtColor={theme.textPrimary}
                borderc={theme.border}
              />
            </Card>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.bhContainer}>
              <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                Billing History
              </InterTightMedium>
              <View style={styles.divider} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SubscriptionAndBillingScreen;
