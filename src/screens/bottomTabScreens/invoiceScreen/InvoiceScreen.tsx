import {
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import FilterAndSorting from '@/components/filterAndSorting/FilterAndSorting';
import { InvoiceScreenProps } from '@/types/navigation.types';

interface FilterAndSortingType {
  startDate: string;
  endDate: string;
  statuses: string[];
  amount: string;
}

const InvoiceScreen = ({navigation} : InvoiceScreenProps) => {
  const [search, setSearch] = useState<string>('');
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterData, setFliterData] = useState<FilterAndSortingType>({
    startDate: '',
    endDate: '',
    statuses: [],
    amount: '',
  });
  const [appliedData, setAppliedData] = useState<FilterAndSortingType | null>(
    null,
  );

  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToSelectQuoteScreen = () => {
    navigation.navigate('SelectQuoteScreen')
  }

  const handleSearchInput = useCallback((txt: string) => {
    setSearch(txt);
  }, []);

  const handleCloseFilterModal = useCallback(() => {
    setAppliedData(filterData);
    setOpenFilterModal(false);
  }, [filterData]);

  const togglestatuse = useCallback((type: string) => {
    setFliterData(prev => {
      const isSelected = prev.statuses.includes(type);

      return {
        ...prev,
        statuses: isSelected
          ? prev.statuses.filter(item => item !== type)
          : [...prev.statuses, type],
      };
    });
  }, []);

  const toggleAmount = useCallback((type: string) => {
    setFliterData(prev => ({
      ...prev,
      amount: prev.amount === type ? '' : type,
    }));
  }, []);

  const fillStartInput = useCallback((startDate: string) => {
    setFliterData(prev => ({
      ...prev,
      startDate,
    }));
  }, []);

  const fillEndInput = useCallback((endDate: string) => {
    setFliterData(prev => ({
      ...prev,
      endDate,
    }));
  }, []);
  const handleClear = useCallback(() => {
    setFliterData({
      startDate: '',
      endDate: '',
      statuses: [],
      amount: '',
    });

    setAppliedData(null);
    setOpenFilterModal(false);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View
              style={[styles.headerComponent, { paddingTop: insets.top + 12 }]}
            >
              <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
                Invoices
              </InterTightSemiBold>

              <View style={styles.searchandfilter}>
                <View style={styles.inputicon}>
                  <Image
                    source={icons.ic_whitesearch}
                    style={styles.searchic}
                  />

                  <Input
                    bg={theme.searchInput}
                    style={styles.noBorderInput}
                    placeholder="Search here"
                    value={search}
                    onChangeText={handleSearchInput}
                  />
                </View>

                <View style={styles.imgView}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setOpenFilterModal(true)}
                  >
                    <Image
                      source={isDark ? icons.ic_darksf : icons.ic_filter}
                      style={styles.img}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.add}>
            <TouchableOpacity activeOpacity={0.8} onPress={navigateToSelectQuoteScreen}>
              <Image source={icons.ic_add} style={styles.ic} />
            </TouchableOpacity>
          </View>
        </View>
        <FilterAndSorting
          visible={openFilterModal}
          onClose={handleCloseFilterModal}
          onClear={handleClear}
          selectedStatus={filterData.statuses}
          selectedAmount={filterData.amount}
          startDate={filterData.startDate}
          endDate={filterData.endDate}
          fillStartInput={fillStartInput}
          fillEndInput={fillEndInput}
          onToggleStatus={togglestatuse}
          onToggleAmount={toggleAmount}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default InvoiceScreen;
