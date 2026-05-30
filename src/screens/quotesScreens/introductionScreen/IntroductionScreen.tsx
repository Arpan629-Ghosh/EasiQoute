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

const IntroductionScreen = ({ navigation, route }: IntroductionScreenProps) => {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const { title, content, order } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.contaner}>
      <View style={styles.mainContainer}>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <View style={styles.arrowContainer}>
            <TouchableOpacity onPress={handleBack}>
              <Image
                source={isDark ? icons.ic_backwhite : icons.ic_back}
                style={styles.img}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.txtContainer}>
          <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
            {title}
          </InterTightMedium>

          <Card>
            <View style={styles.contentHeader}>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                Order:
              </InterTightRegular>

              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                {order}
              </InterTightRegular>
            </View>

            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {content}
            </InterTightRegular>
          </Card>
        </View>
      </View>
    </LinearGradient>
  );
};

export default IntroductionScreen;
