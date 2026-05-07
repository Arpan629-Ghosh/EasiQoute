import { StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import ModalComponent from '../modal/ModalComponent'
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import InterTightSemiBold from '../fontComponents/InterTightSemiBold';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

type Props = {
    visible: boolean;
    onClose: () => void
}
const MarginBottomSheet = ({ visible, onClose }: Props) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <ModalComponent visible={visible} onClose={onClose} mheight={431}>
      <View style={styles.header}>
        <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
          Margin
        </InterTightMedium>
      </View>
      <View style={styles.marginDetail}>
        <View style={styles.details}>
          <View style={styles.heading}>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              Item Name{'        '}
            </InterTightMedium>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              revenue{'           '}
            </InterTightMedium>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              costs{'              '}
            </InterTightMedium>
            <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
              margin{' '}
            </InterTightMedium>
          </View>
          <View style={styles.rows}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Item 1{'                '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £50.00{'         '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £25.00{'        '}
            </InterTightRegular>
            <View>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                £25.00
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                (50%){' '}
              </InterTightRegular>
            </View>
          </View>
          <View style={styles.rows}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Item 2{'               '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £50.00{'         '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £25.00{'        '}
            </InterTightRegular>
            <View>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                £25.00
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                (50%){' '}
              </InterTightRegular>
            </View>
          </View>
          <View style={styles.rows}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Item 3{'               '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £50.00{'         '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              £25.00{'        '}
            </InterTightRegular>
            <View>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                £25.00
              </InterTightRegular>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                (50%){' '}
              </InterTightRegular>
            </View>
          </View>
          <View style={styles.empty} />
          <View style={styles.rows}>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              Total{'                   '}
            </InterTightSemiBold>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              £50.00{'         '}
            </InterTightSemiBold>
            <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
              £25.00{'        '}
            </InterTightSemiBold>
            <View>
              <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
                £25.00
              </InterTightSemiBold>
              <InterTightSemiBold fsize={14} fcolor={theme.textPrimary}>
                (50%){' '}
              </InterTightSemiBold>
            </View>
          </View>
          <View style={styles.empty} />
        </View>
        <View style={styles.bttnContainer}>
          <ButtonComponent
            bg={theme.primary}
            onPress={onClose}
            bttnTxt="Got It"
            txtColor={theme.primaryText}
            style={styles.bttn}
          />
        </View>
      </View>
    </ModalComponent>
  );
}

export default React.memo(MarginBottomSheet)

const createStyles = (theme: Theme) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
  },
  marginDetail: {
    gap: 1,
  },
  details: {
    gap: 16,
  },
  heading: {
    flexDirection: 'row',

    padding: 12,
    gap: 8,
    backgroundColor: theme.cardSecondary,
  },
  rows: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 16,
  },
  bttnContainer: {
    padding: 12,
    gap: 12,
  },
  bttn: {
    borderRadius: 12,
    padding: 10,
    gap: 10,
    backgroundColor: theme.primary,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    borderWidth: 0.5,
    borderColor: theme.border,
  },
});