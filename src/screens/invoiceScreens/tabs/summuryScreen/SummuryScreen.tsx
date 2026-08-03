import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
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
import { InvoiceTopTabWithRootProps } from '@/types/navigation.types';
import { useQuotes } from '@/hooks/apis/useQuotes';
import { useInvoice } from '@/hooks/apis/useInvoice';
import { useInvoiceContext } from '@/hooks/useInvoiceContext';

export interface AttachmentFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}
export interface NewInvoiceProp {
  quoteId: number | undefined;
  invoice_date: string;
  due_date: string;
  message: string;
  notes: string;
  file: AttachmentFile[];
}
const SummuryScreen = ({ route, navigation }: InvoiceTopTabWithRootProps<'Summury'>) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [newInvoiceFormData, setNewInvoiceFormData] = useState<NewInvoiceProp>({
    quoteId: route.params?.quoteId,
    invoice_date: '',
    due_date: '',
    message: '',
    notes: '',
    file: [],
  });
  const { setSummary } = useInvoiceContext();
  const { quoteList } = useQuotes();
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const { createInvoice, loadingCreateInvoice } = useInvoice();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const invoiceId = route.params?.invoiceId;
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILES = 10;

  // console.log("quoteId: ", route.params?.quoteId)
  // console.log("invoiceId: ", route.params?.invoiceId)

  const extractQuote = useMemo(() => {
    const extractedQuote = quoteList.filter(
      quote => quote.id === route.params?.quoteId,
    );
    return extractedQuote;
  }, [quoteList, route.params?.quoteId]);

  const updateField = useCallback(
    (key: keyof NewInvoiceProp, value: string) => {
      setNewInvoiceFormData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const removeFile = useCallback((index: number) => {
    setNewInvoiceFormData(prev => ({
      ...prev,
      file: prev.file.filter((_, i) => i !== index),
    }));
  }, []);

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
    setNewInvoiceFormData(prev => {
      return {
        ...prev,
        invoice_date: stratDate,
      };
    });
  };

  const fillEndInput = (endDate: string) => {
    setNewInvoiceFormData(prev => {
      return {
        ...prev,
        due_date: endDate,
      };
    });
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
      setNewInvoiceFormData(prev => {
        const merged = [...prev.file];
        selectedFiles.forEach(newFile => {
          const exists = merged.some(
            file => file.name === newFile.name && file.size === newFile.size,
          );

          if (!exists) {
            merged.push(newFile);
          }
        });
        if (merged.length > MAX_FILES) {
          showToast(`You can upload a maximum of ${MAX_FILES} files`, 'error');
          return prev;
        }
        return {
          ...prev,
          file: merged,
        };
      });
    } catch (error: any) {
      if (error?.code !== 'DOCUMENT_PICKER_CANCELED') {
        console.log(error);
        showToast('Failed to select file', 'error');
      }
    }
  };

  const handleCreateInvoice = async () => {
    // console.log(newQuoteFormData);
    try {
      await createInvoice({
        quote_id: route.params?.quoteId,
        invoice_date: newInvoiceFormData.invoice_date,
        due_date: newInvoiceFormData.due_date,
        message: newInvoiceFormData.message,
        notes: newInvoiceFormData.notes
      });
      showToast('Invoice created successfully.');
      setSummary(newInvoiceFormData);
      setNewInvoiceFormData({
        quoteId: route.params?.quoteId,
        invoice_date: '',
        due_date: '',
        message: '',
        notes: '',
        file: [],
      });
      navigation.navigate('Items')
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const updateContextForInvoiceUpdate = () => {
    setSummary(newInvoiceFormData);
    navigation.navigate('Items');
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
                {extractQuote[0]?.title}
              </InterTightMedium>
              <InterTightLight fsize={14} fcolor={theme.textPrimary}>
                {extractQuote[0]?.name}
              </InterTightLight>
            </View>
            <View style={styles.border} />

            <InterTightLight fsize={14} fcolor={theme.textPrimary}>
              Linked Quote:{' '}
              <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                {extractQuote[0]?.reference_number}
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
                  Issue Date
                </InterTightRegular>
                <TouchableOpacity
                  style={styles.inputicon}
                  onPress={handleCalenderStartPicker}
                >
                  <Input
                    placeholder="DD-MM-YYYY"
                    style={styles.noBorderInput}
                    editable={false}
                    value={newInvoiceFormData.invoice_date}
                    onChangeText={txt => updateField('invoice_date', txt)}
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
                    value={newInvoiceFormData.due_date}
                    onChangeText={txt => updateField('due_date', txt)}
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
                placeholder="Explain what the invoice covers"
                multiline={true}
                tv="top"
                value={newInvoiceFormData.message}
                onChangeText={txt => updateField('message', txt)}
              />
            </View>
            <View style={styles.note}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Notes (Not visible on invoice)
              </InterTightRegular>

              <Input
                inputHeight={100}
                placeholder="Add private notes"
                multiline={true}
                tv="top"
                value={newInvoiceFormData.notes}
                onChangeText={txt => updateField('notes', txt)}
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
          <View style={styles.files}>
            {newInvoiceFormData.file.map((file, index) => (
              <View key={`${file.name}-${index}`} style={styles.docs}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  {file.name}
                </InterTightRegular>

                <TouchableOpacity onPress={() => removeFile(index)}>
                  <Image source={icons.ic_delete} style={styles.delete} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
            showLoader={loadingCreateInvoice}
            onPress={
              invoiceId ? updateContextForInvoiceUpdate : handleCreateInvoice
            }
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
