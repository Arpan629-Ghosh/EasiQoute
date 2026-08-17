import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import AppButton from '@/components/appButton/AppButton';
import { ScrollView } from 'react-native-gesture-handler';
import CustomDropdown, { Item } from '@/components/dropdown/CustomDropdown';
import { useInvoice } from '@/hooks/apis/useInvoice';
import { useDebounce } from '@/hooks/useDebounce';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDateForInput } from '@/utils/formatDate';
import { useClient } from '@/hooks/apis/useClient';
import { GetClients } from '@/types/apis/client.types';
import { usePayments } from '@/hooks/apis/usePayments';
import { useToast } from '@/hooks/useToast';
import { RootScreenProps } from '@/types/navigation.types';

export interface RecordPaymentProps {
  amtType: 'deposit' | 'invoice';
  invoiceId?: number | null;
  date: string;
  method: string;
  clientId?: number | undefined;
  amt?: string | undefined;
}

const paymentMethods: Item[] = [
  {
    label: 'cash',
    value: 1,
  },
  {
    label: 'stripe',
    value: 2,
  },
];

const RecordPaymentScreen = ({
  navigation,
}: RootScreenProps<'RecordPaymentScreen'>) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<'start' | null>(null);
  const [recordPaymentData, setRecordPaymentData] =
    useState<RecordPaymentProps>({
      amtType: 'invoice',
      invoiceId: null,
      date: '',
      method: 'cash',
      clientId: undefined,
      amt: undefined,
    });
  const [search, setSearch] = useState<string>('');
  const [searchMethod, setSearchMethod] = useState<string>('');
  const [paginationLoading, setPaginationLoading] = useState(false);
  const page = useRef(1);
  const { createPaymentAsync, isCreatingPayment } = usePayments();
  const { getInvoices, invoiceList } = useInvoice();
  const { clients, current_page, last_page, getClients } = useClient();
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const debouncedSearch = useDebounce(search);
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleCalenderPicker = () => {
    setActiveField('start');
    setDatePickerVisible(true);
  };

  useEffect(() => {
    if (recordPaymentData.amtType === 'deposit') {
      page.current = 1;
      getClients({
        search: debouncedSearch,
        sort_by: 'asc',
        page: page.current,
      });
    }
  }, [getClients, debouncedSearch, recordPaymentData.amtType]);

  useEffect(() => {
    if (recordPaymentData.amtType === 'invoice') {
      getInvoices({
        is_not_paid: 1,
        search: debouncedSearch,
      });
    }
  }, [recordPaymentData.amtType, getInvoices, debouncedSearch]);

  const updateField = useCallback(
    <K extends keyof RecordPaymentProps>(
      key: K,
      value: RecordPaymentProps[K],
    ) => {
      setRecordPaymentData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

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

  const shapedDataForDropdown = useMemo(() => {
    return invoiceList.map(invoice => ({
      label: `${invoice.reference_number} - ${invoice.title}`,
      value: invoice.id,
    }));
  }, [invoiceList]);

  const fillInput = (stratDate: string) => {
    setRecordPaymentData(prev => {
      return {
        ...prev,
        date: stratDate,
      };
    });
  };

  const handleConfirm = (date: Date) => {
    const formatted = formatDateForInput(date);

    if (activeField === 'start') {
      fillInput(formatted);
    }

    setDatePickerVisible(false);
  };

  const findInvoice = invoiceList.find(
    invoice => invoice.id === recordPaymentData.invoiceId,
  );

  const credit =
    Number(findInvoice?.deposit_available) > Number(findInvoice?.price)
      ? Number(findInvoice?.deposit_available) - Number(findInvoice?.price)
      : 0;

  const shapedClientsDataForDropdown = useMemo(() => {
    return clients.map(client => ({
      label: `${client.name} - ${client.company_name}`,
      value: client.id,
    }));
  }, [clients]);

  const handleCreatePayment = async () => {
    const amount =
      recordPaymentData.amtType === 'invoice'
        ? Number(findInvoice?.price) - Number(findInvoice?.deposit_available)
        : Number(recordPaymentData.amt);

    let payload : RecordPaymentProps = {
      amtType: recordPaymentData.amtType,
      method: recordPaymentData.method,
      date: recordPaymentData.date,
      amt: String(amount),
    };

    if (recordPaymentData.amtType === 'invoice')
     payload = {...payload, invoiceId: recordPaymentData.invoiceId}
    if (recordPaymentData.amtType === 'deposit')
      payload = {...payload, clientId: recordPaymentData.clientId}
    try {
      await createPaymentAsync(payload);

      showToast('Payment recorded successfully', 'success');
      navigation.goBack();
    } catch (error) {
      console.log('Create payment error:', error);

      showToast(String(error), 'error');
    }
  };

  console.log(searchMethod);

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <Header txt="Record Payment" borderBottomEnabled />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.inputs}>
            <View style={styles.amt}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Amount
              </InterTightRegular>
              <View style={styles.select}>
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={() => updateField('amtType', 'deposit')}
                    style={[
                      styles.option,
                      recordPaymentData.amtType === 'deposit'
                        ? styles.selectAmt
                        : null,
                    ]}
                  >
                    <InterTightRegular
                      fsize={14}
                      fcolor={
                        recordPaymentData.amtType === 'deposit'
                          ? theme.primaryText
                          : theme.textPrimary
                      }
                    >
                      Deposit
                    </InterTightRegular>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => updateField('amtType', 'invoice')}
                    style={[
                      styles.option,
                      recordPaymentData.amtType === 'invoice'
                        ? styles.selectAmt
                        : null,
                    ]}
                  >
                    <InterTightRegular
                      fsize={14}
                      fcolor={
                        recordPaymentData.amtType === 'invoice'
                          ? theme.primaryText
                          : theme.textPrimary
                      }
                    >
                      Invoice
                    </InterTightRegular>
                  </TouchableOpacity>
                </View>
                {recordPaymentData.amtType === 'deposit' && (
                  <AppInput
                    placeholder="Enter amount"
                    style={styles.depositInput}
                    keyboardType="numeric"
                    value={recordPaymentData.amt}
                    onChangeText={txt => updateField('amt', txt)}
                  />
                )}
              </View>
            </View>
            {recordPaymentData.amtType === 'deposit' && (
              <View style={styles.invoiceDropDown}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Client
                </InterTightRegular>
                <CustomDropdown
                  data={shapedClientsDataForDropdown}
                  placeholder="Search or select client"
                  value={recordPaymentData?.clientId || null}
                  onChange={(item: Item) =>
                    updateField('clientId', Number(item.value))
                  }
                  onSearch={setSearch}
                  flatListProps={{
                    onEndReached: handleLoadMore,
                    onEndReachedThreshold: 0.3,
                    ListFooterComponent: renderFooter,
                  }}
                />
              </View>
            )}
            {recordPaymentData.amtType === 'invoice' ? (
              <View style={styles.invoiceDropDown}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Select Invoice
                </InterTightRegular>
                <CustomDropdown
                  data={shapedDataForDropdown}
                  placeholder="Select an invoice"
                  onChange={(item: Item) =>
                    updateField('invoiceId', Number(item.value))
                  }
                  onSearch={setSearch}
                  value={recordPaymentData.invoiceId || null}
                />
              </View>
            ) : (
              <View style={styles.invoiceDropDown}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  Select Quote
                </InterTightRegular>
                <CustomDropdown
                  data={shapedDataForDropdown}
                  placeholder="Select an Quote"
                  onChange={(item: Item) =>
                    updateField('invoiceId', Number(item.value))
                  }
                  onSearch={setSearch}
                  value={recordPaymentData.invoiceId || null}
                />
              </View>
            )}
            <View style={styles.invoiceDropDown}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Date
              </InterTightRegular>

              <TouchableOpacity
                style={styles.inputicon}
                onPress={handleCalenderPicker}
              >
                <AppInput
                  placeholder="DD-MM-YYYY"
                  style={styles.noBorderInput}
                  editable={false}
                  value={recordPaymentData.date}
                  onChangeText={txt => updateField('date', txt)}
                />

                <Image source={icons.ic_cal} style={styles.searchic} />
              </TouchableOpacity>
            </View>
            <View style={styles.invoiceDropDown}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Method
              </InterTightRegular>
              <CustomDropdown
                data={paymentMethods}
                onChange={(item: Item) =>
                  updateField('method', String(item.label))
                }
                value={recordPaymentData.method || null}
                onSearch={setSearchMethod}
                placeholder="Select method"
              />
            </View>
          </View>
        </View>
        {recordPaymentData.invoiceId && (
          <View style={styles.bottom}>
            <View style={styles.bottomContent}>
              <InfoRow label="Amount Due" value={`£${findInvoice?.price}`} />
              <InfoRow
                label="Deposit Available"
                value={`£${findInvoice?.deposit_available}`}
              />
              <InfoRow
                label="From This Payment"
                value={`£${
                  Number(findInvoice?.price) -
                  Number(findInvoice?.deposit_available)
                }`}
              />
              <View style={styles.border} />
              <InfoRow label="Credit After Payment" value={`£${credit}`} />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <AppButton
            bttnTxt="Confirm Payment"
            bg={theme.primary}
            txtColor={theme.primaryText}
            showLoader={isCreatingPayment}
            onPress={handleCreatePayment}
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

export default RecordPaymentScreen;
