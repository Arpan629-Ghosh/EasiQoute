import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import BottomModalComponent from '../modal/BottomModalComponent';
import CardHeader from '../cardDetailsComponent/CardHeader';
import AppButton from '../appButton/AppButton';
import InterTightRegular from '../appFonts/InterTightRegular';

import { icons } from '@/config/icons';
import { setLanguage } from '@/redux/language/languageSlice';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

type Prop = {
  visible: boolean;
  onClose: () => void;
};

type LanguageType = 'en' | 'hi' | 'bn' | 'gu' | 'Device';

const LanguageBottomSheet = ({ visible, onClose }: Prop) => {
  const dispatch = useDispatch();

  const { theme } = useAppTheme();

  const { languageMode } = useAppLanguage();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleLanguage = (language: LanguageType) => {
    dispatch(setLanguage(language));
  };

  return (
    <BottomModalComponent visible={visible} onClose={onClose} mheight={450}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <CardHeader title="Language" />
        </View>

        {/* Languages */}
        <View style={styles.language}>
          {/* English */}
          <TouchableOpacity
            onPress={() => handleLanguage('en')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              English
            </InterTightRegular>

            <Image
              source={
                languageMode === 'en' ? icons.ic_appdotcircle : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>

          <View style={styles.borderLine} />

          {/* Hindi */}
          <TouchableOpacity
            onPress={() => handleLanguage('hi')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              हिन्दी
            </InterTightRegular>

            <Image
              source={
                languageMode === 'hi' ? icons.ic_appdotcircle : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>

          <View style={styles.borderLine} />

          {/* Bengali */}
          <TouchableOpacity
            onPress={() => handleLanguage('bn')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              বাংলা
            </InterTightRegular>

            <Image
              source={
                languageMode === 'bn' ? icons.ic_appdotcircle : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>

          <View style={styles.borderLine} />

          {/* Gujarati */}
          <TouchableOpacity
            onPress={() => handleLanguage('gu')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              ગુજરાતી
            </InterTightRegular>

            <Image
              source={
                languageMode === 'gu' ? icons.ic_appdotcircle : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>

          <View style={styles.borderLine} />

          {/* Device */}
          <TouchableOpacity
            onPress={() => handleLanguage('Device')}
            style={styles.row}
          >
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              Device language
            </InterTightRegular>

            <Image
              source={
                languageMode === 'Device' ? icons.ic_appdotcircle : icons.ic_appcircle
              }
              style={styles.icn}
            />
          </TouchableOpacity>

          <View style={styles.borderLine} />
        </View>

        {/* Footer */}
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

export default React.memo(LanguageBottomSheet);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },

    borderLine: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },

    language: {
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
