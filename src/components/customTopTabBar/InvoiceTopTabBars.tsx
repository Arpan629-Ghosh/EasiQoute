import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const InvoiceTopTabBars = ({
  state,
  navigation,
  invoiceDetails,
  invoiceTitle,
  clientName,
}: any) => {
  const [openEdit, setOpenEdit] = useState(false);
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const animation = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: openEdit ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEdit]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const navigateToBack = () => {
    navigation.goBack();
  };

  const navigateToUpdate = () => {
    navigation.navigate('SelectQuoteScreen', {
      invoiceDetails: invoiceDetails,
    });
  };

  return (
    <View style={styles.content}>
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
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerComponent}>
          <TouchableOpacity onPress={navigateToBack}>
            <Image
              source={isDark ? icons.ic_backwhite : icons.ic_back}
              style={styles.img}
            />
          </TouchableOpacity>
          <View style={styles.animation}>
            <TouchableOpacity onPress={() => setOpenEdit(!openEdit)}>
              <Image
                source={isDark ? icons.ic_darkdots : icons.ic_dots}
                style={styles.img}
              />
            </TouchableOpacity>

            <Animated.View
              style={[
                styles.update,
                {
                  opacity,
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity activeOpacity={0.8} onPress={navigateToUpdate}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Update Invoice
                </InterTightRegular>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      <View style={styles.headerText}>
        <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
          {invoiceTitle} - {clientName}
        </InterTightMedium>
      </View>
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
    </View>
  );
};

export default InvoiceTopTabBars;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      //   flex: 1,
    },
    tabBarContainer: {
      flexDirection: 'row',
      borderRadius: 40,
      padding: 4,
      marginHorizontal: 12,
      marginTop: 20,
      height: 41,
      backgroundColor: theme.background,
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
    header: {
      paddingBottom: 12,
      gap: 12,
    },
    headerComponent: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    img: {
      height: 28,
      width: 28,
    },
    update: {
      position: 'absolute',
      top: 25,
      right: 0,
      backgroundColor: theme.background,
      // paddingVertical: 10,
      // paddingHorizontal: 14,
      borderRadius: 12,
      width: 100,
      height: 30,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    animation: {
      position: 'relative',
    },
    headerText: {
      paddingHorizontal: 12,
    },
  });
