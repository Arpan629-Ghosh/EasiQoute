import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import React, { useMemo } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import InterTightMedium from '../fontComponents/InterTightMedium';
import LinearGradient from 'react-native-linear-gradient';

const CustomTabBars = ({ state, descriptors, navigation }: any) => {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

    const navigateToBack = () => {
        navigation.goBack();
  };
  return (
      <View style={styles.container}>
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
      <View style={styles.itemContainer}>
        <View style={styles.headerComponent}>
          <ButtonComponent onPress={navigateToBack}>
            <Image
              source={isDark ? icons.ic_backwhite : icons.ic_back}
              style={styles.img}
            />
          </ButtonComponent>
          <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
            New Quote
          </InterTightMedium>
          <View style={styles.emptyview} />
        </View>
        <View  style={styles.tabBarContainer}>
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
      </View>
    </View>
  );
};

export default CustomTabBars;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
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
      marginTop: 56,
    },

    tabBarContainer: {
      flexDirection: 'row',
      borderRadius: 40,
      padding: 4,
      marginHorizontal: 16,
      height: 41,
      backgroundColor: '#E8E8F2',
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
