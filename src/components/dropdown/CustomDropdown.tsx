import React, { useMemo } from 'react';
import { View, StyleSheet, FlatListProps } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

export type Item = {
  label: string;
  value: string | number;
};
  
interface Props {
  data: Item[] | string[];
  value: string | number | null;
  placeholder: string;
  flatListProps?: Partial<FlatListProps<Item>>;
  onChange: (item: Item) => void;
  onSearch?: (text: string) => void;
}

const CustomDropdown = ({ data, value, placeholder, flatListProps, onChange, onSearch}: Props) => {
  const { theme } = useAppTheme();

    const styles = useMemo(() => createStyles(theme), [theme]);
    
    

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainer}
        selectedTextStyle={styles.selectedTextStyle}
        activeColor={theme.background}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        flatListProps={flatListProps}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default React.memo(CustomDropdown);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },

    dropdown: {
      height: 52,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 14,
      paddingHorizontal: 14,
      backgroundColor: theme.background,
    },

    dropdownContainer: {
      backgroundColor: theme.background,
      borderColor: theme.border,
      borderRadius: 14,
    },

    placeholderStyle: {
      color: theme.textSecondary,
      fontSize: 14,
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
  });
