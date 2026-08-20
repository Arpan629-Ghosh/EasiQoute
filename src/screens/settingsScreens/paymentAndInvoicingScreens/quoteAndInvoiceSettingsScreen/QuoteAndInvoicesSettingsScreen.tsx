import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import AppButton from '@/components/appButton/AppButton';
import Signature from '@/components/signature/Signature';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const QuoteAndInvoicesSettingsScreen = () => {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSignature = useCallback((sign: string) => {

    setSignature(sign);
   
    setIsLoading(false);
    setOpen(false)
  }, []);

  const handleClear = useCallback(() => {
    
    setSignature(null);
    setOpen(false);
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header txt={t('header.quote&invoice')} borderBottomEnabled={true} />
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.inp}>
                <View style={styles.inpHeader}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.termsAndCondition.label')}
                  </InterTightRegular>
                  <Image source={icons.ic_iicon} style={styles.icn} />
                </View>
                <AppInput
                  inputHeight={100}
                  placeholder={t('inputs.termsAndCondition.placeholder')}
                  multiline={true}
                  tv="top"
                />
              </View>

              <View style={styles.inp}>
                <View style={styles.inpHeader}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.footerMssg.label')}
                  </InterTightRegular>
                  <Image source={icons.ic_iicon} style={styles.icn} />
                </View>
                <AppInput placeholder={t('inputs.footerMssg.placeholder')} />
              </View>

              <View style={styles.inp}>
                <View style={styles.inpHeader}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {t('inputs.signature.name')}
                  </InterTightRegular>

                  <Image source={icons.ic_iicon} style={styles.icn} />
                </View>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <View style={styles.signature}>
                    {signature ? (
                      <Image
                        resizeMode="contain"
                        style={styles.sign}
                        source={{ uri: signature }}
                      />
                    ) : (
                      <>
                        <Image
                          source={icons.ic_addsign}
                          style={styles.addsign}
                        />
                        <InterTightRegular
                          fsize={14}
                          fcolor={theme.textSecondary}
                        >
                          Add your signature
                        </InterTightRegular>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <AppButton
              bg={theme.primary}
              bttnTxt={t('button.saveChanges')}
              txtColor={theme.primaryText}
            />
          </View>
        </View>
        <Signature
          visible={open}
          onClose={handleClose}
          isLoading={isLoading}
          handleClear={handleClear}
          handleSignature={handleSignature}
          setIsLoading={setIsLoading}
        />
      </LinearGradient>
    </View>
  );
};

export default QuoteAndInvoicesSettingsScreen;
