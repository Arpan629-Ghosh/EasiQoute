import { Image, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Header from '@/components/header/Header';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];

const NewItemsScreen = () => {
  const [selectedFilterOption, setSelectFilterOption] = useState<string>('');

  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleFilterOption = (option: string) => {
    const isSelected = selectedFilterOption === option;

    if (isSelected) {
      setSelectFilterOption('');
    } else {
      setSelectFilterOption(option);
    }
  };

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <View style={styles.header}>
        <Header txt="Create New Item" borderBottomEnabled={true}  />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.filterandinput}>
            <View style={styles.filterheading}>
              <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                Category
              </InterTightMedium>

              <View style={styles.filter}>
                {FilterOptions.map(item => {
                  const isSelected = selectedFilterOption === item;

                  return (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.8}
                      onPress={() => handleFilterOption(item)}
                      style={[
                        styles.filterbttn,
                        isSelected && styles.slectedfilterbttn,
                      ]}
                    >
                      <InterTightRegular
                        fsize={14}
                        fcolor={isSelected ? '#082B60' : '#89909D'}
                      >
                        {item}
                      </InterTightRegular>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.filterheading}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Subcategory
              </InterTightRegular>

              <View style={styles.inputicon}>
                <Input
                  style={styles.noBorderInput}
                  placeholder="Search or select category"
                />

                <Image source={icons.ic_down} style={styles.img} />
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Item Name
              </InterTightRegular>

              <Input placeholder="Item Name" />
            </View>

            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Unit
              </InterTightRegular>

              <View style={styles.inputicon}>
                <Input style={styles.noBorderInput} placeholder="Unit" />

                <Image source={icons.ic_down} style={styles.img} />
              </View>
            </View>

            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Price per Unit
              </InterTightRegular>

              <Input placeholder="e.g. 10" />
            </View>

            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Unit Cost
              </InterTightRegular>

              <Input placeholder="e.g. 5" />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewItemsScreen;
