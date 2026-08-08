import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import InterTightMedium from '../fontComponents/InterTightMedium';
import Header from '../header/Header';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

interface CustomTabBarsProps extends MaterialTopTabBarProps {
  headerText: string;
  canAccessTabs: boolean;
}
const CustomTabBars = ({
  state,
  navigation,
  headerText,
  canAccessTabs,
}: CustomTabBarsProps) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isTabDisabled = (routeName: string) => {
    // Summary is always accessible
    if (routeName === 'Summury') {
      return false;
    } // All other tabs require quote to be created
    return !canAccessTabs;
  };

  return (
    <View style={styles.container}>
      <Header txt={headerText} borderBottomEnabled={true}>
        <View style={styles.tabBarContainer}>
          {state.routes.map((route: any, index: number) => {
            const isFocused = state.index === index;
            const disabled = isTabDisabled(route.name);

            return (
              <TouchableOpacity
                key={route.key}
                disabled={disabled}
                activeOpacity={disabled ? 1 : 0.7}
                onPress={() => {
                  if (disabled) {
                    return;
                  }
                  navigation.navigate(route.name);
                }}
                style={[
                  styles.tab,
                  isFocused && styles.activeTab,
                  disabled && styles.disabledTab,
                ]}
              >
                <InterTightMedium
                  fsize={14}
                  fcolor={
                    disabled
                      ? theme.textSecondary
                      : isFocused
                      ? theme.primaryText
                      : theme.textPrimary
                  }
                >
                  {route.name}
                </InterTightMedium>
              </TouchableOpacity>
            );
          })}
        </View>
      </Header>
    </View>
  );
};

export default CustomTabBars;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },

    itemContainer: {
      gap: 16,
    },

    headerComponent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },

    tabBarContainer: {
      flexDirection: 'row',
      borderRadius: 40,
      padding: 4,
      marginHorizontal: 16,
      height: 41,
      backgroundColor: theme.topTab,
    },

    tab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',

      borderRadius: 33,
    },

    activeTab: {
      backgroundColor: theme.primary,
      paddingVertical: 8,
      height: 33,
      gap: 8,
      width: 84,
    },

    img: {
      height: 24,
      width: 24,
      resizeMode: 'contain',
    },

    emptyview: {
      width: 24,
    },
    disabledTab: { opacity: 0.45 },
  });
