import { Image, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiscountModal from '@/components/discountModal/DiscountModal';
import InvoiceMargin from '@/components/invoiceMargin/InvoiceMargin';
import { InvoiceTopTabWithRootProps } from '@/types/navigation.types';

const FilterOptions = ['Materials', 'Labour', 'Services', 'Miscellaneous'];
const ItemsScreen = ({ navigation }: InvoiceTopTabWithRootProps<'Items'>) => {
  const [selectedFilterOption, setSelectFilterOption] = useState<string>('');
  // const [selectedItems, setSelectedItems] = useState<FetchItemsData[]>([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFinancialBreakdown, setOpenFinancialBreakdown] =
    useState<boolean>(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);

  const insets = useSafeAreaInsets();
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    height.value = withTiming(openFinancialBreakdown ? 500 : 0, {
      duration: 300,
    });

    opacity.value = withTiming(openFinancialBreakdown ? 1 : 0, {
      duration: 250,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openFinancialBreakdown]);

  const navigateToNewItem = () => {
    navigation.navigate('NewItemsScreen');
  };

  const toggleFinancialMargin = () => {
    setOpenFinancialBreakdown(!openFinancialBreakdown);
  };

  const handleCloseDiscount = useCallback(() => {
    setOpenDiscount(false);
  }, []);

  const discountValue = (discount: number) => {
    setDiscountPrice(discount);
  };

  const handleFilterOption = (option: string) => {
    const isSelected = selectedFilterOption.includes(option);
    isSelected ? setSelectFilterOption('') : setSelectFilterOption(option);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      maxHeight: height.value,
      opacity: opacity.value,
      overflow: 'hidden',
    };
  });
  return (
    <LinearGradient
      colors={theme.gradientPrimary}
      style={styles.linearGradient}
    >
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
            // value={search}
            // onChangeText={txt => handleInput(txt)}
          />
          <TouchableOpacity onPress={() => setOpenDropDown(!openDropDown)}>
            <Image source={icons.ic_drop} style={styles.searchic} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flatlist}>{/* scrolling content */}</View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
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
          <Animated.View style={[styles.inforow, animatedStyle]}>
            <>
              <InfoRow label="Subtotal" value="£5,000.00" />

              <TouchableOpacity>
                <InfoRow
                  label="Available Credit"
                  value="Apply Credit"
                  activeColor={true}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setOpen(true)}>
                <InfoRow
                  label="Margin (50%)"
                  value="Check Margin"
                  activeColor={true}
                />
              </TouchableOpacity>

              <InfoRow label="Tax(8%)" value="£200.00" />

              <TouchableOpacity onPress={() => setOpenDiscount(true)}>
                <InfoRow
                  label="Discount"
                  value="+ Add Discount"
                  activeColor={true}
                />
              </TouchableOpacity>

              <View style={styles.empty} />

              <InfoRow label="Grand Total" value="£4,700.00" />

              <View style={styles.empty} />
            </>
          </Animated.View>
          <View style={styles.bttnContainer}>
            <ButtonComponent
              borderc={theme.primary}
              bttnTxt="New Item"
              txtColor={theme.textPrimary}
              onPress={navigateToNewItem}
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
              buttonWidth={169.5}
              // showLoader={loadingUpdateQuote}
              // onPress={handleUpdateQuote}
            />
          </View>
        </View>
      </View>

      <InvoiceMargin
        visible={open}
        onClose={handleClose}
      />

      <DiscountModal
        visible={openDiscount}
        onClose={handleCloseDiscount}
        onDiscount={discountValue}
      />
    </LinearGradient>
  );
};

export default ItemsScreen;
