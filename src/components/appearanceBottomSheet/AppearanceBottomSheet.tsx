import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import BottomModalComponent from '../modal/BottomModalComponent';
import CardHeader from '../cardDetailsComponent/CardHeader';
import { icons } from '@/config/icons';
import AppButton from '../appButton/AppButton';
import InterTightRegular from '../appFonts/InterTightRegular';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/redux/theme/themeSlice';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

type Prop = {
  visible: boolean;
  onClose: () => void;
};
type ThemeType = 'Light' | 'Dark' | 'Device';
const AppearanceBottomSheet = ({ visible, onClose }: Prop) => {
  const dispatch = useDispatch();
  const handleTheme = (theme: ThemeType) => {
    dispatch(setTheme(theme));
  };
  const { theme, mode, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <BottomModalComponent visible={visible} onClose={onClose} mheight={330}>
      <View style={styles.container}>
        <View style={styles.header}>
          <CardHeader title="Appearance" />
        </View>

        <View style={styles.appearance}>
          <TouchableOpacity
            onPress={() => handleTheme('Light')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              Light theme
            </InterTightRegular>
            <Image
              source={
                mode === 'Light' ? icons.ic_appdotcircle : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => handleTheme('Dark')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              Dark theme{' '}
            </InterTightRegular>
            <Image
              source={
                mode === 'Dark' ? icons.ic_darkselect : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>
          <View style={styles.borderLine} />
          <TouchableOpacity
            onPress={() => handleTheme('Device')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              Device theme{' '}
            </InterTightRegular>

            <Image
              source={
                mode === 'Device'
                  ? isDark
                    ? icons.ic_darkselect
                    : icons.ic_appdotcircle
                  : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>
          <View style={styles.borderLine} />
        </View>
        <View style={styles.footer}>
          <View style={styles.bttnContainer}>
            <AppButton
              onPress={onClose}
              bg={theme.primary}
              bttnTxt="Save Preference"
              txtColor={theme.primaryText}
            />
          </View>
        </View>
      </View>
    </BottomModalComponent>
  );
};

export default React.memo(AppearanceBottomSheet);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    borderLine: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    appearance: {
      paddingHorizontal: 12,
      gap: 8,
    },
    icn: {
      height: 20,
      width: 20,
    },
    footer: {
      flexDirection: 'column',
    },
    bttnContainer: {
      paddingHorizontal: 12,
      marginBottom: 34,
    },
    header: {
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
  });
