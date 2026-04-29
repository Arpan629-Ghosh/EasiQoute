import { Image,StyleSheet, View } from 'react-native';
import React, { SetStateAction } from 'react';
import ModalComponent from '../modal/ModalComponent';
import InterTightMedium from '../fontComponents/InterTightMedium';
import Input from '../inputComponent/Input';
import { StatusData } from '@/config/status';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import InterTightRegular from '../fontComponents/InterTightRegular';
import { icons } from '@/config/icons';
import DateTimePicker from 'react-native-modal-datetime-picker';

type Props = {
  visible: boolean;
  selectedStatus: string[];
  selectedAmount: string;
  startDate: string;
  endDate: string;
  isDatePickerVisible: boolean;
  setDatePickerVisible: React.Dispatch<SetStateAction<boolean>>
  onToggleStatus: (type: string) => void;
  onToggleAmount: (type: string) => void;
  fillEndInput: (endDate: string) => void;
  fillStartInput: (startDate: string) => void;
  onClose: () => void;
  handleCalenderStartPicker: () => void;
  handleCalenderEndPicker: () => void;
  handleConfirm: (date: Date) => void;
};
const FilterAndSorting = ({
  visible,
  selectedStatus,
  selectedAmount,
  startDate,
  endDate,
  isDatePickerVisible,
  setDatePickerVisible,
  onToggleStatus,
  onToggleAmount,
  onClose,
  handleCalenderStartPicker,
  handleCalenderEndPicker,
  handleConfirm,
}: Props) => {
  
  return (
    <ModalComponent visible={visible} onClose={onClose} mheight={580}>
      <View style={styles.container}>
        <View style={styles.header}>
          <InterTightMedium fsize={18} fcolor="#2D2D2D">
            Filters & Sorting
          </InterTightMedium>
        </View>
        <View style={styles.header}>
          <InterTightMedium fsize={16} fcolor="#2D2D2D">
            Date Range
          </InterTightMedium>
          <View style={styles.inputContainer}>
            <View style={styles.inputicon}>
              <Input
                placeholder="Start Date"
                value={startDate}
                style={styles.noBorderInput}
                editable={false}
              />
              <ButtonComponent onPress={handleCalenderStartPicker}>
                <Image source={icons.ic_cal} style={styles.searchic} />
              </ButtonComponent>
            </View>
            <View style={styles.inputicon}>
              <Input
                value={endDate}
                placeholder="End Date"
                style={styles.noBorderInput}
                editable={false}
              />
              <ButtonComponent onPress={handleCalenderEndPicker}>
                <Image source={icons.ic_cal} style={styles.searchic} />
              </ButtonComponent>
            </View>
          </View>
        </View>
        <View style={styles.header}>
          <InterTightMedium fsize={16} fcolor="#2D2D2D">
            Status
          </InterTightMedium>
          <View style={styles.status}>
            {StatusData.map(item => {
              const isSelected = selectedStatus.includes(item.type);

              return (
                <ButtonComponent
                  key={item.type}
                  style={[styles.chip, isSelected && styles.selectedChip]}
                  onPress={() => onToggleStatus(item.type)}
                  activeOpacity={0.8}
                >
                  <Image source={item.icon} style={styles.icon} />

                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    {item.type}
                  </InterTightRegular>

                  {isSelected && (
                    <Image source={icons.ic_cross} style={styles.cross} />
                  )}
                </ButtonComponent>
              );
            })}
          </View>
        </View>
        <View style={styles.header}>
          <InterTightMedium fsize={16} fcolor="#2D2D2D">
            Sort by Amount
          </InterTightMedium>
          <View style={styles.status}>
            <ButtonComponent
              onPress={() => onToggleAmount('Low to High')}
              style={[
                styles.chip,
                selectedAmount === 'Low to High' && styles.selectedChip,
              ]}
            >
              <Image source={icons.ic_htl} style={styles.icon} />
              <InterTightRegular fsize={14} fcolor="#2D2D2D">
                Low to High
              </InterTightRegular>
            </ButtonComponent>
            <ButtonComponent
              onPress={() => onToggleAmount('High to Low')}
              style={[
                styles.chip,
                selectedAmount === 'High to Low' && styles.selectedChip,
              ]}
            >
              <Image source={icons.ic_lth} style={styles.icon} />
              <InterTightRegular fsize={14} fcolor="#2D2D2D">
                High to Low
              </InterTightRegular>
            </ButtonComponent>
          </View>
        </View>
        <View style={styles.bttncontainer}>
          <ButtonComponent style={styles.bttn1}>
            <InterTightMedium fsize={16} fcolor="#D23949">
              Clear All
            </InterTightMedium>
          </ButtonComponent>
          <ButtonComponent onPress={onClose} style={styles.bttn2}>
            <InterTightMedium fsize={16} fcolor="#FFFFFF">
              Apply
            </InterTightMedium>
          </ButtonComponent>
        </View>
      </View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => {
          handleConfirm(date);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ModalComponent>
  );
};

export default React.memo(FilterAndSorting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: '#E4E6F4',
  },
  inputContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  inputicon: {
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderColor: '#E4E6F4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    overflow: 'hidden',
    gap: 12,
  },
  noBorderInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 12,
    height: '100%',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E6F4',
    backgroundColor: '#FFFFFF',
    justifyContent: "space-between"
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'contain',
  },
  status: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bttncontainer: {
    padding: 12,
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bttn1: {
    height: 46,
    width: 165.5,
    borderRadius: 10,
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
  bttn2: {
    height: 46,
    width: 165.5,
    borderRadius: 10,
    padding: 10,
    gap: 1,
    backgroundColor: '#082B60',
    alignItems: 'center',
  },
  searchic: {
    height: 18,
    width: 18,
  },
  mainContainer: {
    height: 606,
    gap: 16,
  },
  selectedChip: {
    backgroundColor: '#082B600A',
    borderColor: '#082B60',
  },
  cross: {
    height: 8,
    width: 8,
    marginLeft: 12
  },
  
});
