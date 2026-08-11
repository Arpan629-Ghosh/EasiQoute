import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import MiddleModalComponent from '../modal/MiddleModalComponent';
import InterTightMedium from '../appFonts/InterTightMedium';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import InterTightRegular from '../appFonts/InterTightRegular';
import AppButton from '../appButton/AppButton';


interface Props {
    visible: boolean;
    onClose: () => void
}
const InvoiceMargin = ({ visible, onClose }: Props) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
          Margin
        </InterTightMedium>
      </View>
      <View style={styles.header}>
        <View style={styles.content}>
          <View style={styles.textView}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {' '}
              Revenue
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £500.00
            </InterTightRegular>
          </View>
          <View style={styles.textView}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {' '}
              Costs
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £500.00
            </InterTightRegular>
          </View>
          <View style={styles.textView}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              {' '}
              Margin
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £500.00
            </InterTightRegular>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <AppButton
          bttnTxt="Got It!"
          bg={theme.primary}
          txtColor={theme.primaryText}
          onPress={onClose}
        />
      </View>
    </MiddleModalComponent>
  );
}

export default InvoiceMargin

const createStyles = (theme: Theme) =>
  StyleSheet.create({
      header: {
        
      gap: 16,
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderBottomWidth: 0.5,
          borderBottomColor: theme.border,
    
    },
    content: {
        gap: 16,
        width: "100%"
    },
      textView: {
    
      justifyContent: 'space-between',
          flexDirection: 'row',
        
    },
    footer: {
      padding: 12,
    },
  });