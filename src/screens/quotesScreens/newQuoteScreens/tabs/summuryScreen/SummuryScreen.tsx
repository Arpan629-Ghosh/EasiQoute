import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { useQuotes } from '@/hooks/apis/useQuotes';
import { useToast } from '@/hooks/useToast';
import { pick, types } from '@react-native-documents/picker';
import { QuoteTopTabWithRootProps } from '@/types/navigation.types';
import { useClient } from '@/hooks/apis/useClient';
import { useDebounce } from '@/hooks/useDebounce';
import { GetClients } from '@/types/apis/client.types';
import CustomDropdown, { Item } from '@/components/dropdown/CustomDropdown';

export interface AttachmentFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface NewQuoteForm {
  quoteTitle: string;
  refNumber: string;
  qtDate: string;
  expDate: string;
  client: number | null;
  jobDescription: string;
  notes: string;
  file: AttachmentFile[];
}

const SummuryScreen = ({
  navigation,
  route,
}: QuoteTopTabWithRootProps<'Summury'>) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [newQuoteFormData, setNewQuoteFormData] = useState<NewQuoteForm>({
    quoteTitle: route.params.quoteDetails?.title || '',
    refNumber: route.params.quoteDetails?.reference_number || '',
    qtDate: route.params.quoteDetails?.quote_date || '',
    expDate: route.params.quoteDetails?.expiry_date || '',
    client: route.params.quoteDetails?.client.id ?? null,
    jobDescription: route.params.quoteDetails?.job_description || '',
    notes: route.params.quoteDetails?.notes || '',
    file: route.params.quoteDetails?.attachments || [],
  });

  const page = useRef(1);
  const { theme } = useAppTheme();
  const { createQuote, loadingUpdateQuote } = useQuotes();
  const { clients, current_page, last_page, getClients } = useClient();
  const { showToast } = useToast();
  const debouncedSearch = useDebounce(search);
  const insets = useSafeAreaInsets();
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILES = 10;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    page.current = 1;
    getClients({
      search: debouncedSearch,
      sort_by: 'asc',
      page: page.current,
    });
  }, [getClients, debouncedSearch]);

  const hasMore = useMemo(() => {
    return current_page < last_page;
  }, [current_page, last_page]);

  const handleLoadMore = useCallback(async () => {
    if (paginationLoading || !hasMore) {
      return;
    }
    try {
      setPaginationLoading(true);
      const nextPage = page.current + 1;
      page.current = nextPage;
      const payload: GetClients = {
        search: debouncedSearch,
        page: nextPage,
        sort_by: 'asc',
      };
      await getClients(payload);
    } finally {
      setPaginationLoading(false);
    }
  }, [paginationLoading, hasMore, debouncedSearch, getClients]);

  const renderFooter = useCallback(() => {
    if (!paginationLoading) {
      return null;
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [paginationLoading, styles.loaderContainer]);

  const navigateToAddClientScreen = () => {
    navigation.navigate('AddClientScreen');
  };
  const updateField = useCallback(
    <K extends keyof NewQuoteForm>(key: K, value: NewQuoteForm[K]) => {
      setNewQuoteFormData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

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

    return `${day}-${month}-${year}`;
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

  const removeFile = useCallback((index: number) => {
    setNewQuoteFormData(prev => ({
      ...prev,
      file: prev.file.filter((_, i) => i !== index),
    }));
  }, []);

  const shapedDataForDropdown = useMemo(() => {
    return clients.map(client => ({
      label: `${client.name} • ${client.company_name}`,
      value: client.id,
    }));
  }, [clients]);

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
      setNewQuoteFormData(prev => {
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

  const handleCreateQuote = async () => {
    try {
      await createQuote({
        title: newQuoteFormData.quoteTitle,
        description: newQuoteFormData.jobDescription,
        quote_date: newQuoteFormData.qtDate,
        expiry_date: newQuoteFormData.expDate,
        client_id: Number(newQuoteFormData.client),
        notes: newQuoteFormData.notes,
        attachments: newQuoteFormData.file,
      });
      showToast('Quote created successfully.');
      setNewQuoteFormData({
        quoteTitle: '',
        refNumber: '',
        qtDate: '',
        expDate: '',
        client: null,
        jobDescription: '',
        notes: '',
        file: [],
      });
      navigation.jumpTo('Items', {
        quoteDetails: route.params.quoteDetails
      })
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  console.log("selected client: ", newQuoteFormData.client)
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
              <CustomDropdown
                data={shapedDataForDropdown}
                placeholder="Search or select client"
                value={newQuoteFormData.client}
                onChange={(item: Item) => updateField('client', Number(item.value))}
                onSearch={setSearch}
                flatListProps={{
                  onEndReached: handleLoadMore,
                  onEndReachedThreshold: 0.3,
                  ListFooterComponent: renderFooter,
                }}
              />
              <TouchableOpacity onPress={navigateToAddClientScreen}>
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
              <TouchableOpacity onPress={openDocumentPicker}>
                <Image source={images.img_fileupload} style={styles.upload} />
              </TouchableOpacity>
            </View>
            <View style={styles.files}>
              {newQuoteFormData.file.map((file, index) => (
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
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
            showLoader={loadingUpdateQuote}
            onPress={handleCreateQuote}
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
