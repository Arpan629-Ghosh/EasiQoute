import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import InterTightLight from '@/components/fontComponents/InterTightLight';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import CustomToggle from '@/components/switch/CustomToggle';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { images } from '@/config/images';
import { pick, types } from '@react-native-documents/picker';
import { useToast } from '@/hooks/useToast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';

const SummuryScreen = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
  const [enabled, setEnabled] = useState(false);

  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILES = 10;

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

    return `${day}-${month}-${year}`;
  };

  const fillStartInput = (stratDate: string) => {
    // setNewQuoteFormData(prev => {
    //   return {
    //     ...prev,
    //     qtDate: stratDate,
    //   };
    // });
  };

  const fillEndInput = (endDate: string) => {
    // setNewQuoteFormData(prev => {
    //   return {
    //     ...prev,
    //     expDate: endDate,
    //   };
    // });
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

  const openDocumentPicker = async () => {
      try {
        const result = await pick({
          type: [types.pdf, types.docx, types.images],
          allowMultiSelection: true,
        });
        const selectedFiles = result
          .map(file => ({
            uri: file.uri,
            name: file.name ?? 'attachment',
            type: file.type ?? 'application/octet-stream',
            size: typeof file.size === 'number' ? file.size : undefined,
          }))
          .filter(file => {
            const isValidSize = (file.size ?? 0) <= MAX_FILE_SIZE;
            if (!isValidSize) {
              showToast(
                `${file.name} exceeds the maximum size of 10 MB`,
                'error',
              );
            }
            return isValidSize;
          });
        if (!selectedFiles.length) {
          return;
        }
        // setNewQuoteFormData(prev => {
        //   const merged = [...prev.file];
        //   selectedFiles.forEach(newFile => {
        //     const exists = merged.some(
        //       file => file.name === newFile.name && file.size === newFile.size,
        //     );
  
        //     if (!exists) {
        //       merged.push(newFile);
        //     }
        //   });
        //   if (merged.length > MAX_FILES) {
        //     showToast(`You can upload a maximum of ${MAX_FILES} files`, 'error');
        //     return prev;
        //   }
        //   return {
        //     ...prev,
        //     file: merged,
        //   };
        // });
      } catch (error: any) {
        if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
          console.log(error);
          showToast('Failed to select file', 'error');
        }
      }
    };

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={theme.gradientPrimary}
            style={styles.linearGradient}
          >
            <View style={styles.txtView}>
              <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
                Cabin Restoration
              </InterTightMedium>
              <InterTightLight fsize={14} fcolor={theme.textPrimary}>
                Bryan Johnson
              </InterTightLight>
            </View>
            <View style={styles.border} />

            <InterTightLight fsize={14} fcolor={theme.textPrimary}>
              Linked Quote:{' '}
              <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                QT-2025-201
              </InterTightMedium>{' '}
            </InterTightLight>
          </LinearGradient>

          <View style={styles.phoneText}>
            <InterTightRegular fsize={16} fcolor={theme.textPrimary}>
              Hide your phone number
            </InterTightRegular>
            <CustomToggle value={enabled} onToggle={setEnabled} />
          </View>
        </View>
        <View style={styles.basicInfo}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            Basic Information
          </InterTightMedium>
          <View style={styles.invNumber}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Invoice Number
            </InterTightRegular>
            <View style={styles.invField}>
              <InterTightRegular fsize={16} fcolor={theme.placeholder}>
                INV-2025-001
              </InterTightRegular>
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
                    // value={newQuoteFormData.qtDate}
                    // onChangeText={txt => updateField('qtDate', txt)}
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
                    // value={newQuoteFormData.expDate}
                    // onChangeText={txt => updateField('expDate', txt)}
                  />
                  <Image source={icons.ic_cal} style={styles.searchic} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.note}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Project / Services Notes
              </InterTightRegular>

              <Input
                inputHeight={100}
                placeholder="Enter job details..."
                multiline={true}
                tv="top"
                // value={newQuoteFormData.jobDescription}
                // onChangeText={txt => updateField('jobDescription', txt)}
              />
            </View>
            <View style={styles.note}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Notes (Not visible on invoice)
              </InterTightRegular>

              <Input
                inputHeight={100}
                placeholder="Enter job details..."
                multiline={true}
                tv="top"
                // value={newQuoteFormData.jobDescription}
                // onChangeText={txt => updateField('jobDescription', txt)}
              />
            </View>
          </View>
        </View>

        <View style={styles.basicInfo}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            Attachments
          </InterTightMedium>

          <View style={styles.fileupload}>
                        <TouchableOpacity onPress={openDocumentPicker}>
                          <Image source={images.img_fileupload} style={styles.upload} />
                        </TouchableOpacity>
                      </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
              <View style={styles.footerContainer}>
                <ButtonComponent
                  bg={theme.primary}
                  bttnTxt="Save"
                  txtColor={theme.primaryText}
                  // showLoader={loadingUpdateQuote}
                  // onPress={handleCreateQuote}
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
    </LinearGradient>
  );
};

export default SummuryScreen;
