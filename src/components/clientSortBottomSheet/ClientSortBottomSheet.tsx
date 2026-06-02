import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import ModalComponent from '../modal/ModalComponent';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  selectedSortOption: string;
  onClose: () => void;
  onToggleSort: (type: string) => void
}

interface Sort {
  type: string;
  icon: ImageSourcePropType
}

export const SortData = (): Sort[] => {
  const { isDark } = useAppTheme();
  return [
    {
      type: 'A-Z',
      icon: isDark ? icons.ic_darkl1 : icons.ic_az,
    },
    {
      type: 'Recently Added',
      icon: isDark ? icons.ic_darkl2 : icons.ic_radded,
    },
    {
      type: 'Most Active',
      icon: isDark ? icons.ic_darkl2 : icons.ic_mactive,
    },
  ];
};

const ClientSortBottomSheet = ({
  visible,
  selectedSortOption,
  onClose,
  onToggleSort,
}: Props) => {
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ModalComponent visible={visible} onClose={onClose}>
      <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.header}>
          <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
            Sort by
          </InterTightMedium>
        </View>
        <View style={styles.options}>
          {SortData().map(item => {
            const isSelected = selectedSortOption.includes(item.type);

            return (
              <View key={item.type} style={styles.statusView}>
                <TouchableOpacity
                  key={item.type}
                  onPress={() => onToggleSort(item.type)}
                  activeOpacity={0.8}
                  style={styles.statusBttn}
                >
                  <Image source={item.icon} style={styles.img} />

                  <InterTightRegular
                    fsize={16}
                    fcolor={isSelected ? theme.textMuted : theme.textSecondary}
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
                {item.type !== 'Most Active' && <View style={styles.empty} />}
              </View>
            );
          })}
        </View>
      </View>
    </ModalComponent>
  );
};

export default React.memo(ClientSortBottomSheet);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    header: {
      paddingVertical: 16,
      paddingHorizontal: 12,
      gap: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    options: {
      gap: 8,
      paddingHorizontal: 12,
    },
    option: {
      flexDirection: 'row',
      paddingVertical: 8,
      gap: 8,
    },
    img: {
      height: 16,
      width: 16,
    },
    border: {
      borderBottomWidth: 1,
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
    statusBttn: {
      flexDirection: 'row',
      paddingVertical: 8,
      gap: 8,
      width: '100%',

      alignItems: 'center',
    },
    empty: {
      borderWidth: 0.5,
      borderColor: theme.border,
    },
  });
