import { Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { createStyles } from './style';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomToggle from '@/components/switch/CustomToggle';
import { images } from '@/config/images';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NewQuoteForm {
  quoteTitle: string;
  refNumber: string;
  qtDate: string;
  expDate: string;
  client: string;
  jobDescription: string;
  notes: string;
  file: string;
}

const SummuryScreen = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
  const [enabled, setEnabled] = useState(false)

  const [newQuoteFormData, setNewQuoteFormData] = useState<NewQuoteForm>({
    quoteTitle: "",
    refNumber: "",
    qtDate: "",
    expDate: "",
    client: "",
    jobDescription: "",
    notes: "",
    file: ""
  })
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme])
  const updateField = (key: keyof NewQuoteForm, value: string) => {
    setNewQuoteFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const fillStartInput = (stratDate: string) => {
    setNewQuoteFormData(prev => {
        return {
          ...prev,
          qtDate: stratDate,
        };
      });
    };
  
    const fillEndInput = (endDate: string) => {
      setNewQuoteFormData(prev => {
        return {
          ...prev,
          expDate: endDate,
        };
      });
    };

  const handleCalenderStartPicker = () => {
    setActiveField('start');
    setDatePickerVisible(true);
  };

  const handleCalenderEndPicker = () => {
    setActiveField('end');
    setDatePickerVisible(true);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const handleConfirm = (date: Date) => {
    const formatted = formatDate(date);

    if (activeField === 'start') {
      fillStartInput(formatted);
    } else if (activeField === 'end') {
      fillEndInput(formatted);
    }

    setDatePickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
        enabled={true}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          // bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <View style={styles.basicinfo}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              Basic Information
            </InterTightMedium>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Quote Title
              </InterTightRegular>
              <Input
                placeholder="e.g. Kitchen Renovation"
                value={newQuoteFormData.quoteTitle}
                onChangeText={txt => updateField('quoteTitle', txt)}
                keyboardType="name-phone-pad"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Reference Number
              </InterTightRegular>
              <Input
                placeholder="QT-2025-001"
                value={newQuoteFormData.refNumber}
                onChangeText={txt => updateField('refNumber', txt)}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputs}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Quote Date
                </InterTightRegular>
                <TouchableOpacity
                  style={styles.inputicon}
                  onPress={handleCalenderStartPicker}
                >
                  <Input
                    placeholder="DD-MM-YYYY"
                    style={styles.noBorderInput}
                    editable={false}
                    value={newQuoteFormData.qtDate}
                    onChangeText={txt => updateField('qtDate', txt)}
                  />

                  <Image source={icons.ic_cal} style={styles.searchic} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputs}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Expiry Date
                </InterTightRegular>
                <TouchableOpacity
                  style={styles.inputicon}
                  onPress={handleCalenderEndPicker}
                >
                  <Input
                    placeholder="DD-MM-YYYY"
                    style={styles.noBorderInput}
                    editable={false}
                    value={newQuoteFormData.expDate}
                    onChangeText={txt => updateField('expDate', txt)}
                  />
                  <Image source={icons.ic_cal} style={styles.searchic} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.switch}>
              <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
                Hide your phone number
              </InterTightRegular>
              <CustomToggle value={enabled} onToggle={setEnabled} />
            </View>
          </View>

          <View style={styles.basicinfo}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              Client & Job Information
            </InterTightMedium>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Client
              </InterTightRegular>
              <View style={styles.input}>
                <Input
                  placeholder="Search or select client"
                  style={styles.noBorderInput}
                  value={newQuoteFormData.client}
                  onChangeText={txt => updateField('client', txt)}
                />
                <TouchableOpacity>
                  <Image source={icons.ic_drop} style={styles.searchic} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Image source={icons.ic_newclient} style={styles.newclient} />
              </TouchableOpacity>
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Job Description
              </InterTightRegular>
              <Input
                inputHeight={100}
                placeholder="Enter job details..."
                multiline={true}
                tv="top"
                value={newQuoteFormData.jobDescription}
                onChangeText={txt => updateField('jobDescription', txt)}
              />
            </View>
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Notes (Not visible on quote){' '}
              </InterTightRegular>
              <Input
                inputHeight={100}
                placeholder="Add private notes"
                multiline={true}
                tv="top"
                value={newQuoteFormData.notes}
                onChangeText={txt => updateField('notes', txt)}
              />
            </View>
          </View>
          <View style={styles.basicinfo}>
            <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
              Attachments
            </InterTightMedium>
            <View style={styles.fileupload}>
              <TouchableOpacity>
                <Image source={images.img_fileupload} style={styles.upload} />
              </TouchableOpacity>
            </View>
            <View style={styles.files}>
              <View style={styles.docs}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  laborattachment.PDF
                </InterTightRegular>
                <TouchableOpacity>
                  <Image source={icons.ic_delete} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.docs}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  laborattachment.PDF
                </InterTightRegular>
                <TouchableOpacity>
                  <Image source={icons.ic_delete} style={styles.delete} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
          />
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
    </View>
  );
};

export default SummuryScreen;
