import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import InterTightMedium from '../fontComponents/InterTightMedium';
import Header from '../header/Header';

const CustomTabBars = ({ state, descriptors, navigation }: any) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.nestedcontainer}>
        <Header txt="New Quote" borderBottomEnabled={true}>
          <View style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: number) => {
              const isFocused = state.index === index;

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={() => navigation.navigate(route.name)}
                  style={[styles.tab, isFocused && styles.activeTab]}
                >
                  <InterTightMedium
                    fsize={14}
                    fcolor={isFocused ? theme.primaryText : theme.textPrimary}
                  >
                    {route.name}
                  </InterTightMedium>
                </TouchableOpacity>
              );
            })}
          </View>
        </Header>
      </View>
    </View>
  );
};

export default CustomTabBars;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    nestedcontainer: {
      marginTop: 56,
    },

    itemContainer: {
      gap: 16,
    },

    headerComponent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 56,
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
  });
