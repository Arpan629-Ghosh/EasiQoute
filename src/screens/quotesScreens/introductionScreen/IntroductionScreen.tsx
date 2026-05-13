import { Image, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { IntroductionScreenProps } from '@/types/navigation.types';
import { useAppTheme } from '@/hooks/useAppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { createStyles } from './style';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import Card from '@/components/cardDetailsComponent/Card';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const IntroductionScreen = ({ navigation }: IntroductionScreenProps) => {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    
    const handleBack = () => {
        navigation.goBack()
    }
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.contaner}>
      <View style={styles.mainContainer}>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <View style={styles.arrowContainer}>
            <TouchableOpacity style={styles.img} onPress={handleBack}>
              {isDark ? (
                <Image source={icons.ic_backwhite} style={styles.img} />
              ) : (
                <Image source={icons.ic_back} style={styles.img} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.txtContainer}>
          <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
            Introduction
          </InterTightMedium>
          <Card>
            <View style={styles.contentHeader}>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                Order:{' '}
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                1
              </InterTightRegular>
            </View>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              Our company xyz is very good at what we do. Rest of the text is
              dummy, preset designed for residential boiler installations. It
              includes all key components such as boiler unit, fittings,
              pipework, insulation materials, labour hours, and disposal of old
              units. Perfect for heating engineers who frequently quote for
              similar home installation jobs, ensuring consistency in pricing
              and item descriptions every time.
            </InterTightRegular>
          </Card>
        </View>
      </View>
    </LinearGradient>
  );
};

export default IntroductionScreen;
