import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from './style';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import { DATA } from '@/config/NewQuoteScreenFilterData';
import RenderFilterData from '@/components/renderFilterData/RenderFilterData';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import MarginBottomSheet from '@/components/marginBottomSheet/MarginBottomSheet';
import { useAppTheme } from '@/hooks/useAppTheme';

const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];
const ItemsScreen = () => {
  const [openFinancialBreakdown, setOpenFinancialBreakdown] =
    useState<boolean>(false);
  const [selectedFilterOption, setSelectFilterOption] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const toggleFinancialMargin = () => {
    setOpenFinancialBreakdown(!openFinancialBreakdown);
  };
  const handleFilterOption = (option: string) => {
    const isSelected = selectedFilterOption.includes(option);
    isSelected ? setSelectFilterOption('') : setSelectFilterOption(option);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.filteritems}>
          {FilterOptions.map(items => {
            const isSelected = selectedFilterOption.includes(items);
            return (
              <TouchableOpacity
                onPress={() => handleFilterOption(items)}
                style={[
                  styles.filterbttn,
                  isSelected && styles.slectedfilterbttn,
                ]}
                key={items}
              >
                <InterTightRegular
                  fsize={14}
                  fcolor={isSelected ? '#082B60' : '#89909D'}
                >
                  {items}
                </InterTightRegular>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.input}>
          <Input
            placeholder="Search or select subcategory"
            style={styles.noBorderInput}
          />
          <TouchableOpacity>
            <Image source={icons.ic_drop} style={styles.searchic} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <RenderFilterData item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerComponent}>
          <View style={styles.txtContainer}>
            <TouchableOpacity
              style={styles.txt}
              onPress={toggleFinancialMargin}
            >
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                Financial breakdown
              </InterTightMedium>

              <Image
                source={openFinancialBreakdown ? icons.ic_down : icons.ic_close}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
          {openFinancialBreakdown && (
            <View style={styles.inforow}>
              <InfoRow label="Subtotal" value="£765.00" />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <InfoRow
                  label="Margin (50%)"
                  value="Check Margin"
                  activeColor={true}
                />
              </TouchableOpacity>

              <InfoRow label="Tax(8%)" value="£61.20" />
              <InfoRow
                label="Discount"
                value="+ Add Discount"
                activeColor={true}
              />
              <View style={styles.empty} />
              <InfoRow label="Grand Total" value="£749.70" />
              <InfoRow
                label="Deposit"
                value="+ Add Deposit"
                activeColor={true}
              />
              <View style={styles.empty} />
            </View>
          )}
          <View style={styles.bttnContainer}>
            <ButtonComponent
              borderc={theme.primary}
              bttnTxt="New Item"
              txtColor={theme.textPrimary}
              style={styles.bttn1}
              borderwidth={1}
              buttonWidth={169.5}
              gap={8}
            >
              <Image source={icons.ic_blueadd} style={styles.icn} />
            </ButtonComponent>

            <ButtonComponent
              bg={theme.primary}
              bttnTxt="Save & Preview"
              txtColor={theme.primaryText}
              style={styles.bttn2}
              buttonWidth={169.5}
            />
          </View>
        </View>
      </View>
      <MarginBottomSheet visible={open} onClose={handleClose} />
    </View>
  );
};

export default ItemsScreen;
