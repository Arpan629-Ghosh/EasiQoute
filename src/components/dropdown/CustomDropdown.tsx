import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
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
  onChange: (item: Item) => void;
}

const CustomDropdown = ({ data, value, placeholder, onChange }: Props) => {
  const { theme } = useAppTheme();

    const styles = useMemo(() => createStyles(theme), [theme]);
    
    

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default CustomDropdown;

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
      backgroundColor: theme.card,
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
  });
