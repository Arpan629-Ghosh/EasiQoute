import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import React, { createContext, useCallback, useMemo, useState } from 'react';

import { Dimensions, StyleSheet, View, Platform, Image } from 'react-native';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { runOnJS } from 'react-native-worklets';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { icons } from '@/config/icons';

const { width } = Dimensions.get('window');

type ToastType = 'success' | 'error';
type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

const ToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>('success');
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const translateX = useSharedValue(width);
  const opacity = useSharedValue(0);
  const progress = useSharedValue(1);

  const hideToast = useCallback(() => {
    setVisible(false);
    setMessage('');
  }, []);

  const showToast = useCallback(
    (msg: string, type: ToastType = 'success') => {
      if (visible) return;

      setMessage(msg);
      setToastType(type);
      setVisible(true);

      translateX.value = withSequence(
        withTiming(0, {
          duration: 350,
        }),
        withDelay(
          2500,
          withTiming(
            width,
            {
              duration: 300,
            },

            finished => {
              if (finished) {
                runOnJS(hideToast)();
              }
            },
          ),
        ),
      );

      progress.value = 1;

      progress.value = withTiming(0, {
        duration: 2500,
      });

      opacity.value = withSequence(
        withTiming(1, {
          duration: 300,
        }),

        withDelay(
          2500,
          withTiming(0, {
            duration: 300,
          }),
        ),
      );
    },

    [hideToast, opacity, translateX, visible, progress],
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
      opacity: opacity.value,
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const swipeGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(event => {
      const shouldDismiss = event.translationX > 100 || event.velocityX > 800;

      if (shouldDismiss) {
        translateX.value = withTiming(
          width,
          {
            duration: 250,
          },
          finished => {
            if (finished) {
              runOnJS(hideToast)();
            }
          },
        );
        opacity.value = withTiming(0, {
          duration: 250,
        });
      } else {
        translateX.value = withTiming(0, {
          duration: 250,
        });
      }
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <ToastContext.Provider value={{ showToast }}>
        {children}

        {visible && (
          <GestureDetector gesture={swipeGesture}>
            <Animated.View
              style={[
                styles.toastContainer,
                {
                  top:
                    Platform.OS === 'ios' ? insets.top + 10 : insets.top + 15,
                },
                animatedStyle,
              ]}
            >
              <View style={styles.toastContent}>
                <View style={styles.msg}>
                  <Image
                    source={
                      toastType === 'success' ? icons.ic_check : icons.ic_error
                    }
                    style={styles.img}
                  />
                  <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
                    {message}
                  </InterTightRegular>
                </View>

                <Animated.View
                  style={[
                    styles.progressBar,
                    toastType === 'success' ? styles.successbg : styles.errorbg,
                    progressStyle,
                  ]}
                />
              </View>
            </Animated.View>
          </GestureDetector>
        )}
      </ToastContext.Provider>
    </GestureHandlerRootView>
  );
};

export default ToastProvider;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    toastContainer: {
      position: 'absolute',
      left: 16,
      right: 16,
      zIndex: 9999,
      alignItems: 'center',
    },
    toastContent: {
      width: width - 32,
      backgroundColor: theme.background,
      paddingVertical: 16,
      paddingHorizontal: 18,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },

    progressBar: {
      height: 4,
      borderRadius: 16,
      position: 'absolute',
      bottom: 0,
      left: 7,
      overflow: 'hidden',
    },
    successbg: {
      backgroundColor: '#22C55E',
    },
    errorbg: {
      backgroundColor: '#EF4444',
    },
    msg: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    img: {
      height: 15,
      width: 15,
    },
  });
