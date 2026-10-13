import { Image, Pressable, View } from 'react-native';
import React, { useMemo } from 'react';
import { createStyles } from './style';
import { useAppTheme } from '@/hooks/useAppTheme';
import { images } from '@/config/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '@/config/icons';
import InterTightLight from '@/components/appFonts/InterTightLight';
import InterTightBoldItalic from '@/components/appFonts/InterTightBoldItalic';
import LinearGradient from 'react-native-linear-gradient';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import BenefitsList from '@/components/benefitList/BenefitList';
import { ArrowRight } from 'lucide-react-native';

const SubscriptionScreen = () => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern}>
        <Image source={images.img_background_pattern} style={styles.img} />
      </View>
      <View style={styles.content}>
        <View style={styles.centerLogo}>
          <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
            <View style={styles.crossView}>
              <Image source={icons.ic_subcross} style={styles.icn} />
            </View>
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
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <Pressable
            onPress={() => {
              // Connect your subscription action here
            }}
            style={styles.subscribeButton}
          >
            <LinearGradient
              colors={['#000000', '#082B60']}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.primaryButton}
            >
              <InterTightMedium fsize={14} fcolor="#FFFFFF">
                Subscribe Now
              </InterTightMedium>

              <ArrowRight size={20} color="#FFFFFF" />
            </LinearGradient> 
          </Pressable>

          <View style={styles.footerLinks}>
            <Pressable onPress={() => {}}>
              <InterTightLight fsize={12} fcolor="#2D2D2D">
                Restore
              </InterTightLight>
            </Pressable>

            <View style={styles.linkDivider} />

            <Pressable onPress={() => {}}>
              <InterTightLight fsize={12} fcolor="#2D2D2D">
                Terms of Use
              </InterTightLight>
            </Pressable>

            <View style={styles.linkDivider} />

            <Pressable onPress={() => {}}>
              <InterTightLight fsize={12} fcolor="#2D2D2D">
                Privacy Policy
              </InterTightLight>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubscriptionScreen;
