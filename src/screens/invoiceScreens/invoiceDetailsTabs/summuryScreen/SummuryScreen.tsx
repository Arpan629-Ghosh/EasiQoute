import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Card from '@/components/cardDetailsComponent/Card';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { images } from '@/config/images';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import { icons } from '@/config/icons';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import ExpandableItem from '@/components/cardDetailsComponent/ExpandableItem';
import Items from '@/components/cardDetailsComponent/Items';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInvoice } from '@/hooks/apis/useInvoice';
import Loader from '@/components/loader/Loader';
import { InvoiceItem } from '@/types/apis/invoice.types';
import StatusChanger from '@/components/statusChanger/StatusChanger';
import { InvoiceDetailsScreenProps } from '@/types/navigation.types';
import { useToast } from '@/hooks/useToast';
import { useQuotes } from '@/hooks/apis/useQuotes';

const SummuryScreen = ({ route }: InvoiceDetailsScreenProps<'Summury'>) => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const { showToast } = useToast();
  const { invoiceDetails, loadingInvoiceDetails, getInvoiceDetails } =
    useInvoice();
  const { updateStatus } = useQuotes();
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);


  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC', // prevents timezone shifts
    }).format(date);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleStatus = useCallback(async (type: string) => {
    try {
      await updateStatus({
        invoice_id: route.params.invoiceId,
        status: type.toLowerCase(),
      });
      getInvoiceDetails(route.params.invoiceId);
      setSelectedStatus(prev => {
        const isSelected = prev.includes(type);
        const updatedStatus = isSelected ? '' : type;
        return updatedStatus;
      });
    } catch (error) {
      showToast(String(error), 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.content}>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.cardContainer}>
          <Card style={styles.cardone}>
            <View style={styles.status}>
              <InterTightMedium fsize={14} fcolor="#F97315">
                {invoiceDetails?.status}
              </InterTightMedium>
            </View>
            <TouchableOpacity onPress={() => setOpen(!open)}>
              <Image
                source={isDark ? images.img_darkstatus : images.img_status}
                style={styles.statusimg}
              />
            </TouchableOpacity>
          </Card>

          <Card>
            <View style={styles.inforow}>
              <View style={styles.infocard}>
                <Image
                  source={isDark ? icons.ic_darkbg1 : icons.ic_badge1}
                  style={styles.img}
                />
                <CardHeader title="Basic Information" />
              </View>

              <InfoRow
                label="Quote Ref"
                value={invoiceDetails?.quote.reference_number}
              />
              <InfoRow
                label="Created On"
                value={formatDate(invoiceDetails?.invoice_date)}
              />
              <InfoRow
                label="Expiry Date"
                value={formatDate(invoiceDetails?.due_date)}
              />
            </View>
          </Card>

          <Card style={styles.cardtwo}>
            <View style={styles.infocard}>
              <Image
                source={isDark ? icons.ic_darkbg3 : icons.ic_badge3}
                style={styles.img}
              />
              <CardHeader title="Client Details" />
            </View>
            <View style={styles.contact}>
              <View style={styles.contactdetail}>
                <Image
                  source={isDark ? icons.ic_dark1 : icons.ic_logo}
                  style={styles.img}
                />
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  {invoiceDetails?.client.name}
                </InterTightRegular>
              </View>
              <View style={styles.contactdetail}>
                <Image
                  source={isDark ? icons.ic_dark2 : icons.ic_call}
                  style={styles.img}
                />
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  {invoiceDetails?.client.phone}
                </InterTightRegular>
              </View>
              <View style={styles.contactdetail}>
                <Image
                  source={isDark ? icons.ic_dark3 : icons.ic_gmail}
                  style={styles.img}
                />
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  {invoiceDetails?.client.email}
                </InterTightRegular>
              </View>
              <View style={styles.contactdetail}>
                <Image
                  source={isDark ? icons.ic_dark4 : icons.ic_location}
                  style={styles.img}
                />
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  {invoiceDetails?.client.address}
                </InterTightRegular>
              </View>
            </View>
          </Card>

          <Card style={styles.cardtwo}>
            <View style={styles.infocard}>
              <Image
                source={isDark ? icons.ic_darkbg4 : icons.ic_section}
                style={styles.img}
              />
              <CardHeader title="Items" />
            </View>
            <View style={styles.expand}>
              {invoiceDetails?.items.map((item: InvoiceItem, index) => {
                return (
                  <View key={item.id}>
                    <ExpandableItem title={item.name}>
                      <Items
                        heading={item.category_name}
                        subHeading1="Quantity"
                        subHeading2="Rate/Unit"
                        subHeading3="Total"
                        value1={item.quantity.toString()}
                        value2={`£${item.price.toString()}`}
                        value3={`£${item.total_price.toString()}`}
                      />
                    </ExpandableItem>
                    {index !== invoiceDetails?.items.length - 1 && (
                      <View style={styles.empty} />
                    )}
                  </View>
                );
              })}
            </View>
          </Card>

          <Card>
            <View style={styles.inforow}>
              <View style={styles.infocard}>
                <Image
                  source={isDark ? icons.ic_darkbg5 : icons.ic_badge4}
                  style={styles.img}
                />
                <CardHeader title="Financial Summary" />
              </View>
              <InfoRow
                label="Sub-total"
                value={`£${invoiceDetails?.financial_summary.sub_total}`}
              />

              <InfoRow label="Credit Applied" />
              <View style={styles.margin}>
                <InfoRow label="Margin (50%)" />
                <InterTightRegular
                  fsize={14}
                  fcolor={theme.primary}
                  textDecoration="underline"
                >
                  Check Margin
                </InterTightRegular>
              </View>
              <InfoRow
                label="Tax (18%)"
                value={`£${invoiceDetails?.financial_summary.tax}`}
              />
              <InfoRow
                label="Discount (20%)"
                value={`£${invoiceDetails?.financial_summary.discount}`}
              />

              <View style={styles.empty} />
              <InfoRow
                label="Grand Total"
                value={`£${invoiceDetails?.financial_summary.grand_total}`}
              />
            </View>
          </Card>

          <Card style={styles.cardtwo}>
            <View style={styles.infocard}>
              <Image source={icons.ic_boldinvoice} style={styles.img} />
              <CardHeader title="Invoice" />
            </View>

            <View style={styles.invoice}>
              <View style={styles.txt}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  INV-2025-101
                </InterTightRegular>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  £4,500
                </InterTightRegular>
              </View>
              <View style={styles.invst}>
                <InterTightMedium fsize={12} fcolor={theme.textMuted}>
                  Overdue
                </InterTightMedium>
              </View>
            </View>
            <View style={styles.empty} />
            <View style={styles.invoice}>
              <View style={styles.txt}>
                <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                  INV-2025-101
                </InterTightRegular>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  £4,500
                </InterTightRegular>
              </View>
              <View style={styles.invst}>
                <InterTightMedium fsize={12} fcolor={theme.textMuted}>
                  Paid
                </InterTightMedium>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.footeritem}>
          <ButtonComponent
            bg={theme.background}
            bttnTxt="Share"
            borderwidth={1}
            borderc="#082B60"
            txtColor={theme.textPrimary}
            gap={8}
          >
            <Image source={icons.ic_share} style={styles.addicon} />
          </ButtonComponent>
        </View>
      </View>
      <StatusChanger
        visible={open}
        onClose={handleClose}
        onToggleStatus={toggleStatus}
        selectedStatus={selectedStatus}
        screen="Invoice"
      />
      <Loader visible={loadingInvoiceDetails } />
    </LinearGradient>
  );
};

export default SummuryScreen;
