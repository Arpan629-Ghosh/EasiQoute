import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from './style';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import { DATA } from '@/config/activities';
import RenderActivities from '@/components/renderActivities/RenderActivities';
import FilterAndSorting from '@/components/filterAndSorting/FilterAndSorting';
import NoSubscription from '@/components/noSubscription/NoSubscription';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppTheme } from '@/hooks/useAppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { MainQuoteScreenProps } from '@/types/navigation.types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FilterAndSorting {
  startDate: string;
  endDate: string;
  statuses: string[];
  amount: string;
}
const MainQouteScreen = ({navigation}: MainQuoteScreenProps) => {
  const [filterData, setFliterData] = useState<FilterAndSorting>({
    startDate: '',
    endDate: '',
    statuses: [],
    amount: '',
  });
  const [appliedData, setAppliedData] = useState<FilterAndSorting | null>(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const [search, setSearch] = useState<string>('');

  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const debouncedSearch = useDebounce(search);

  const navigateToNewQuote = () => {
    navigation.navigate("NewQuoteScreens")
  }

  const handleCloseFilterModal = useCallback(() => {
    setAppliedData(filterData);
    setOpenFilterModal(false);
    // console.log('data', filterData);
  }, [filterData]);

  const handleCloseSubscriptionModal = useCallback(() => {
    setOpenSubscriptionModal(false);
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

  const handleSearchInput = (txt: string) => {
    setSearch(txt);
  };

  const togglestatuse = useCallback((type: string) => {
    setFliterData(prev => {
      const isSelected = prev.statuses.includes(type);

      const updatedStatuses = isSelected
        ? prev.statuses.filter(item => item !== type)
        : [...prev.statuses, type];

      return {
        ...prev,
        statuses: updatedStatuses,
      };
    });
  }, []);

  const toggleAmount = useCallback((type: string) => {
    setFliterData(prev => {
      const isSelected = prev.amount.includes(type);

      const updatedAmount = isSelected ? '' : type;
      return {
        ...prev,
        amount: updatedAmount,
      };
    });
  }, []);

  const fillStartInput = useCallback((stratDate: string) => {
    setFliterData(prev => {
      return {
        ...prev,
        startDate: stratDate,
      };
    });
  }, []);

  const fillEndInput = useCallback((endDate: string) => {
    setFliterData(prev => {
      return {
        ...prev,
        endDate: endDate,
      };
    });
  }, []);

  const processedData = useMemo(() => {
    let result = [...DATA];

    if (!appliedData && !debouncedSearch.trim()) return result;

    const { statuses, amount, startDate, endDate } = appliedData || {};

    if (debouncedSearch.trim()) {
      const lower = debouncedSearch.toLowerCase();

      result = result.filter(
        item =>
          item.title.toLowerCase().includes(lower) ||
          item.company.toLowerCase().includes(lower) ||
          item.typeValue.toLowerCase().includes(lower) ||
          item.paymentStatus.toLowerCase().includes(lower),
      );
    }

    if (statuses && statuses.length > 0) {
      result = result.filter(item => statuses.includes(item.paymentStatus));
    }

    if (startDate || endDate) {
      const parse = (d: string) => {
        const [day, month, year] = d.split('/');
        return new Date(`${year}-${month}-${day}`);
      };

      const start = startDate ? parse(startDate) : null;
      const end = endDate ? parse(endDate) : null;

      result = result.filter(item => {
        if (!item.date) return true;

        const itemDate = parse(item.date);

        if (start && itemDate < start) return false;
        if (end && itemDate > end) return false;

        return true;
      });
    }

    if (amount) {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));

        return amount === 'Low to High' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [appliedData, debouncedSearch]);

  // console.log("processedData", processedData)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled={true}
      keyboardVerticalOffset={3}
    >
      <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
        {isDark ? (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        ) : (
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View style={[styles.headerComponent, {paddingTop: insets.top + 12}]}>
              <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
                Quotes
              </InterTightSemiBold>
              <View style={styles.searchandfilter}>
                <View style={styles.inputicon}>
                  <Image
                    source={icons.ic_whitesearch}
                    style={styles.searchic}
                  />
                  <Input
                    inputWidth={325}
                    bg={theme.searchInput}
                    style={styles.noBorderInput}
                    placeholder="Search here"
                    value={search}
                    onChangeText={txt => handleSearchInput(txt)}
                  />
                </View>

                <View style={styles.imgView}>
                  <TouchableOpacity onPress={() => setOpenFilterModal(true)}>
                    <Image
                      source={isDark ? icons.ic_darksf : icons.ic_filter}
                      style={styles.img}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.flatlist}>
            <FlatList
              data={processedData}
              renderItem={({ item }) => <RenderActivities item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flat}
            />
          </View>
          <View style={styles.add}>
            <TouchableOpacity onPress={navigateToNewQuote}>
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

        <NoSubscription
          visible={openSubscriptionModal}
          onClose={handleCloseSubscriptionModal}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default MainQouteScreen;
