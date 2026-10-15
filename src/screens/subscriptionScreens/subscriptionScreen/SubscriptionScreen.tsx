import { Image, Pressable, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { createStyles } from './style';
import { useAppTheme } from '@/hooks/useAppTheme';
import { images } from '@/config/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '@/config/icons';
import InterTightLight from '@/components/ui/appFonts/InterTightLight';
import InterTightBoldItalic from '@/components/ui/appFonts/InterTightBoldItalic';
import LinearGradient from 'react-native-linear-gradient';
import InterTightMedium from '@/components/ui/appFonts/InterTightMedium';
import BenefitsList from '@/components/benefitList/BenefitList';
import { ArrowRight } from 'lucide-react-native';
import { scaleHeight } from '@/utils/normalize';
import InterTightRegular from '@/components/ui/appFonts/InterTightRegular';
import { RootScreenProps } from '@/types/navigation.types';
import { useGetUserDetails } from '@/hooks/apis/useGetUserDetails';

const SubscriptionScreen = ({
  navigation,
}: RootScreenProps<'SubscriptionScreen'>) => {
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { userDetails } = useGetUserDetails();
  const styles = useMemo(() => createStyles(theme), [theme]);

  

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
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

      <View style={styles.backgroundPattern}>
        <Image source={images.img_background_pattern} style={styles.img} />
      </View>
      <View style={styles.content}>
        <View style={styles.centerLogo}>
          <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
            <TouchableOpacity style={styles.crossView} onPress={() => navigation.goBack()}>
              <Image source={icons.ic_subcross} style={styles.icn} />
            </TouchableOpacity>
            <View style={styles.crossView} />
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.logo}>
          <Image source={images.img_prosub} style={styles.subscription} />
          <View style={styles.priceView}>
            <LinearGradient
              colors={['#E4E6F4', 'rgba(228, 230, 244, 0)']}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.vector}
            />
            <View style={styles.subprice}>
              <InterTightBoldItalic
                fsize={20}
                fcolor={theme.textPrimary}
                style={styles.txt}
              >
                £14.99
                <InterTightLight fsize={20} fcolor={theme.textPrimary}>
                  /month
                </InterTightLight>
              </InterTightBoldItalic>
            </View>
            <LinearGradient
              colors={['#E4E6F4', 'rgba(228, 230, 244, 0)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.vector}
            />
          </View>
        </View>
        <View style={styles.benefitsView}>
          <View style={styles.bHeader}>
            <Image source={icons.ic_prostar} style={styles.star} />
            <InterTightMedium
              fsize={16}
              fcolor={theme.textPrimary}
              style={styles.benifitTxt}
            >
              BENEFITS
            </InterTightMedium>
            <Image source={icons.ic_prostar} style={styles.star} />
          </View>
          <BenefitsList />
        </View>
      </View>
      <View style={styles.footer}>
        <View
          style={[
            styles.footerContainer,
            { paddingBottom: insets.bottom + scaleHeight(12) },
          ]}
        >
          <View style={styles.footerContent}>
            <Pressable
              onPress={() => {
                navigation.navigate('SubscriptionAndBillingScreen', {
                  isSubscriptionActive: userDetails?.is_subscription_active,
                  subscriptionEndDate: userDetails?.subscription_ended_at as string
                });
              }}
              style={styles.subscribeButton}
            >
              <LinearGradient
                colors={['#000000', '#082B60']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.primaryButton}
              >
                <View style={styles.gradientView}>
                  <View style={styles.empty} />
                  <InterTightMedium fsize={16} fcolor="#FFFFFF">
                    Subscribe Now
                  </InterTightMedium>

                  <ArrowRight color="#FFFFFF" style={styles.empty} />
                </View>
              </LinearGradient>
            </Pressable>

            <View style={styles.footerLinks}>
              <Pressable onPress={() => {}} style={styles.link}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Restore
                </InterTightRegular>
              </Pressable>

              <View style={styles.linkDivider} />

              <Pressable onPress={() => {}} style={styles.link}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Terms of Use
                </InterTightRegular>
              </Pressable>

              <View style={styles.linkDivider} />

              <Pressable onPress={() => {}} style={styles.link}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Privacy Policy
                </InterTightRegular>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubscriptionScreen;
