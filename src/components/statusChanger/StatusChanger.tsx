import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import ModalComponent from '../modal/ModalComponent';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { InvoiceStatus, StatusData } from '@/config/status';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuotes } from '@/hooks/apis/useQuotes';
import Loader from '../loader/Loader';

type Props = {
  visible: boolean;
  selectedStatus: string;
  screen?: 'Quote' | 'Invoice';
  onClose: () => void;
  onToggleStatus: (type: string) => void;
};
const StatusChanger = ({
  visible,
  selectedStatus,
  screen = "Quote",
  onClose,
  onToggleStatus,
}: Props) => {

  const { loadingUpdateStatus } = useQuotes();

  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <ModalComponent visible={visible} onClose={onClose} mpadding={insets.bottom + 12}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
            {screen === 'Quote' ? "Quote Status" : "Invoice Status"}
          </InterTightMedium>
        </View>

        <View style={styles.status}>
          {screen === 'Quote'
            ? StatusData().map(item => {
                const isSelected = selectedStatus.includes(item.type);

                return (
                  <View key={item.type} style={styles.statusView}>
                    <TouchableOpacity
                      key={item.type}
                      onPress={() => onToggleStatus(item.type)}
                      activeOpacity={0.8}
                      style={styles.statusBttn}
                    >
                      <Image source={item.icon} style={styles.icon} />

                      <InterTightRegular
                        fsize={16}
                        fcolor={
                          isSelected ? theme.textMuted : theme.textSecondary
                        }
                      >
                        {item.type}
                      </InterTightRegular>

                     
                      {isSelected && (
                        <Image
                          source={isDark ? icons.ic_darktick : icons.ic_tick}
                          style={styles.cross}
                        />
                      )}
                    </TouchableOpacity>
                    {item.type !== 'Overdue' && <View style={styles.empty} />}
                  </View>
                );
              })
            : InvoiceStatus().map(item => {
                const isSelected = selectedStatus.includes(item.type);

                return (
                  <View key={item.type} style={styles.statusView}>
                    <TouchableOpacity
                      key={item.type}
                      onPress={() => onToggleStatus(item.type)}
                      activeOpacity={0.8}
                      style={styles.statusBttn}
                    >
                      <Image source={item.icon} style={styles.icon} />

                      <InterTightRegular
                        fsize={16}
                        fcolor={
                          isSelected ? theme.textMuted : theme.textSecondary
                        }
                      >
                        {item.type}
                      </InterTightRegular>

                      {isSelected && (
                        <Image
                          source={isDark ? icons.ic_darktick : icons.ic_tick}
                          style={styles.cross}
                        />
                      )}
                    </TouchableOpacity>
                    {item.type !== 'Overdue' && <View style={styles.empty} />}
                  </View>
                );
              })}
        </View>
        <Loader visible={ loadingUpdateStatus} />
      </View>
    </ModalComponent>
  );
};

export default React.memo(StatusChanger);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      gap: 16,
    },
    status: {
      gap: 8,
      paddingHorizontal: 12,
    },
    empty: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    icon: {
      width: 16,
      height: 16,
      marginRight: 6,
      resizeMode: 'contain',
    },
    statusBttn: {
      flexDirection: 'row',
      paddingVertical: 8,
      gap: 8,
      width: '100%',

      alignItems: 'center',
    },
    header: {
      paddingVertical: 16,
      paddingHorizontal: 12,
      gap: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.border,
    },
    statusView: {
      gap: 5,
    },
    cross: {
      height: 16,
      width: 16,
      marginLeft: 'auto',
    },
  });
