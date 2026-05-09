import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import { icons } from '@/config/icons';
import { useNavigation } from '@react-navigation/native';
import InterTightMedium from '../fontComponents/InterTightMedium';

interface Props {
  txt?: React.ReactNode;
    borderBottomEnabled: boolean;
    children?: React.ReactNode;
}

const Header: React.FC<Props> = ({ txt, borderBottomEnabled, children }) => {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();

  const navigateToBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[styles.container, borderBottomEnabled && styles.bottomBorder]}
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
      <View style={styles.headerComponent}>
        <TouchableOpacity onPress={navigateToBack}>
          {isDark ? (
            <Image source={icons.ic_backwhite} style={styles.img} />
          ) : (
            <Image source={icons.ic_back} style={styles.img} />
          )}
        </TouchableOpacity>
        <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
      
          {txt}
              </InterTightMedium>
              <View style={styles.empty} />
          </View>
          {children}
    </View>
  );
};

export default Header;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 12,
      gap: 12,
      backgroundColor: theme.background,
    },
    bottomBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    headerComponent: {
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      flexDirection: 'row',

   
    },
    img: {
      height: 28,
      width: 28,
    },
      empty: {
          height: 28,
          width: 28
    }
  });
