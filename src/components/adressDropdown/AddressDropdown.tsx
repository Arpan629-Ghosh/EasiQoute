import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { Theme } from '@/types/theme.types';
import { SearchAddressPayload } from '@/types/apis/auth.types';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Dropdown } from 'react-native-element-dropdown';
import { fontFamily } from '@/constants/fontFamily';
import RenderAddress from '../renderAddress/RenderAddress';
import InterTightRegular from '../appFonts/InterTightRegular';
import { icons } from '@/config/icons';

interface Props {
  data: SearchAddressPayload[];
  value: string;
  loader: boolean;
  onText: React.Dispatch<React.SetStateAction<string>>;
  onSelect: (item: SearchAddressPayload) => void;
}
const AddressDropdown = ({ data, value, loader, onText, onSelect }: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const renderLeftIcon = () => {
    return <Image source={icons.ic_search} style={styles.searchic} />;
  };

  const renderEmpty = () => {
    return (
        <View style={styles.emptyContainer}>
        {loader ? (
          <ActivityIndicator size="small" color={theme.textPrimary} />
        ) : (
         
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              No addresses found
            </InterTightRegular>
       
        )}
        </View>
    );
  };
  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.dropdownContainer}
      itemContainerStyle={styles.itemContainer}
      selectedTextStyle={styles.selectedTextStyle}
      activeColor={theme.background}
      itemTextStyle={styles.itemTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      labelField="address_line_1"
      valueField="address_line_1"
      placeholder="Search postcode"
      searchPlaceholder="Search postcode"
      value={value}
      onChangeText={onText}
      placeholderStyle={styles.placeholderStyle}
      onChange={(item: SearchAddressPayload) => {
        onSelect(item);
      }}
      renderItem={(item: SearchAddressPayload) => <RenderAddress item={item} />}
      flatListProps={{
        ListEmptyComponent: renderEmpty,
      }}
      renderLeftIcon={renderLeftIcon}
      searchQuery={() => true}
      maxHeight={300}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default React.memo(AddressDropdown);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    dropdown: {
      height: 52,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      backgroundColor: theme.background,
    },

    dropdownContainer: {
      backgroundColor: theme.background,
      borderColor: theme.border,
      borderRadius: 14,
      top: 4,
      paddingBottom: 10,
    },
    placeholderStyle: {
      color: theme.textSecondary,
      fontSize: 14,
      left: 5,
    },
    emptyContainer: {
      paddingVertical: 20,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedTextStyle: {
      color: theme.textPrimary,
      fontSize: 14,
    },

    itemTextStyle: {
      color: theme.textPrimary,
      fontSize: 14,
    },
    itemContainer: {
      backgroundColor: theme.background,
    },
    inputSearchStyle: {
      color: theme.textPrimary,
      fontFamily: fontFamily.INTER_TIGHT.regular,
      fontSize: 14,
    },
    searchic: {
      height: 18,
      width: 18,
    },
  });
