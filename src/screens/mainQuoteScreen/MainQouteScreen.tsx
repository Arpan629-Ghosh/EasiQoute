import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { styles } from './style';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import { DATA } from '@/config/activities';
import RenderActivities from '@/components/renderActivities/RenderActivities';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import FilterAndSorting from '@/components/filterAndSorting/FilterAndSorting';


interface FilterAndSorting {
  startDate: string;
  endDate: string;
  statuses: string[];
  amount: string;
}
const MainQouteScreen = () => {
  const [filterData, setFliterData] = useState<FilterAndSorting>({
    startDate: "",
    endDate: "",
    statuses: [],
    amount: ""
  })
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
  const [open, setOpen] = useState(false);

   const handleClose = useCallback(() => {
      setOpen(false);
   }, [])
  
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
    setFliterData((prev) => {
      const isSelected = prev.amount.includes(type)

      const updatedAmount = isSelected ? prev.amount = "" : prev.amount = type
      return {
        ...prev,
        amount: updatedAmount
      }
    })
  }, [])

  const fillStartInput = useCallback((stratDate : string) => {
    setFliterData((prev) => {
      return {
        ...prev,
        startDate: stratDate,
      };
    })
  },[])

  const fillEndInput = useCallback((endDate: string) => {
    setFliterData((prev) => {
      return {
        ...prev,
        endDate: endDate
      }
    })
  },[])

  const handleCalenderStartPicker = useCallback(() => {
    setActiveField('start');
    setDatePickerVisible(true);
  },[]);

  const handleCalenderEndPicker = useCallback(() => {
    setActiveField('end');
    setDatePickerVisible(true);
  },[]);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleConfirm = useCallback((date: Date) => {
    const formatted = formatDate(date);

    if (activeField === 'start') {
      fillStartInput(formatted);
    } else if (activeField === 'end') {
      fillEndInput(formatted);
    }

    setDatePickerVisible(false);
  },[activeField, fillEndInput, fillStartInput]);

  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
      enabled={true}
      keyboardVerticalOffset={3}
    >
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <View style={styles.headerComponent}>
              <InterTightSemiBold fsize={24} fcolor="#2D2D2D">
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
                    bg="#FFFFFF"
                    style={styles.noBorderInput}
                    placeholder="Search here"
                  />
                </View>

                <View style={styles.imgView}>
                  <ButtonComponent onPress={() => setOpen(true)}>
                    <Image source={icons.ic_filter} style={styles.img} />
                  </ButtonComponent>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.flatlist}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <RenderActivities item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.add}>
            <Image source={icons.ic_add} style={styles.ic} />
          </View>
        </View>

        <FilterAndSorting
          visible={open}
          onClose={handleClose}
          selectedStatus={filterData.statuses}
          selectedAmount={filterData.amount}
          startDate={filterData.startDate}
          endDate={filterData.endDate}
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisible={setDatePickerVisible}
          fillStartInput={fillStartInput}
          fillEndInput={fillEndInput}
          onToggleStatus={togglestatuse}
          onToggleAmount={toggleAmount}
          handleCalenderStartPicker={handleCalenderStartPicker}
          handleCalenderEndPicker={handleCalenderEndPicker}
          handleConfirm={handleConfirm}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MainQouteScreen;
