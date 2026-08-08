import { Animated, Image, Linking, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createStyles } from './style';
import { icons } from '@/config/icons';
import LinearGradient from 'react-native-linear-gradient';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import Card from '@/components/cardDetailsComponent/Card';
import { images } from '@/config/images';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import InfoRow from '@/components/cardDetailsComponent/InfoRow';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import ExpandableItem from '@/components/cardDetailsComponent/ExpandableItem';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import StatusChanger from '@/components/statusChanger/StatusChanger';
import { useAppTheme } from '@/hooks/useAppTheme';
import Items from '@/components/cardDetailsComponent/Items';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuotes } from '@/hooks/apis/useQuotes';
import { useToast } from '@/hooks/useToast';
import { FetchItemsData } from '@/types/apis/settings.types';
import Loader from '@/components/loader/Loader';
import { RootScreenProps } from '@/types/navigation.types';
import { STATUS_COLORS } from '@/config/statusColors';

const QouteDetailScreen = ({ navigation, route }: RootScreenProps<'QouteDetailScreen'>) => {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [openEdit, setOpenEdit] = useState(false);
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const { showToast } = useToast();
  const {
    fetchQuoteDetails,
    getSelectedSections,
    updateStatus,
    duplicateQuote,
    deleteQuote,
    quoteDetails,
    loadingQuoteDetails,
    loadingDuplicateQuote,
    loadingDeleteQuote,
    selectedSections,
  } = useQuotes();
  const quoteId = route.params.quoteId; 
  const styles = useMemo(() => createStyles(theme), [theme])

  const animation = useRef(new Animated.Value(0)).current;

  

  useEffect(() => {
    fetchQuoteDetails(quoteId)
    getSelectedSections(quoteId)
  }, [quoteId, fetchQuoteDetails, getSelectedSections])

  const handleDuplicateQuote = () => {
    try {
      duplicateQuote(quoteId);
      showToast('Quote duplcated successfully!');
    } catch (error) {
      showToast(String(error), 'error')
    }
    
  }


  useEffect(() => {
    Animated.timing(animation, {
      toValue: openEdit ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEdit]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const statusColors = STATUS_COLORS[
      quoteDetails?.status as keyof typeof STATUS_COLORS
    ] || {
      view: '#E8ECF4',
      text: '#64748B',
    };

  // const navigateToEdit = () => {
  //   navigation.navigate("Summury")
  // }
  const navigateToBack = () => {
    navigation.goBack();
  };

  const navigateToEdit = () => {
  

    navigation.navigate("NewQuoteScreens", {
      quoteDetails: quoteDetails,
      previewUrl: quoteDetails?.url
    })
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  },[])

  const toggleStatus = useCallback(async (type: string) => {
    try {
      await updateStatus({
        quote_id: quoteId,
        status: type.toLowerCase(),
      });
      await fetchQuoteDetails(quoteId);
      setSelectedStatus(prev => {
        const isSelected = prev.includes(type);
        const updatedStatus = isSelected ? '' : type;
        return updatedStatus;
      });
      handleClose();
    } catch (error) {
      showToast(String(error), 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAttachmentName = (attachment: { type: string }, index: number) => {
    return `Attachment ${index + 1}.${attachment.type}`;
  };

  const handleOpenAttachment = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast('Unable to open attachment', 'error');
      }
    } catch (error) {
      console.log(error)
      showToast('Failed to open attachment', 'error');
    }
  };

  const handleDeleteQuote = async() => {
    try {
      await deleteQuote(quoteId);
      showToast(`${quoteDetails?.title} deleted successfully!`)
      navigateToBack();
    } catch (error) {
      showToast(String(error), 'error')
    }
  }
  

  
  return (
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
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerComponent}>
          <TouchableOpacity onPress={navigateToBack}>
            <Image
              source={isDark ? icons.ic_backwhite : icons.ic_back}
              style={styles.img}
            />
          </TouchableOpacity>
          <View style={styles.animation}>
            <TouchableOpacity onPress={() => setOpenEdit(!openEdit)}>
              <Image
                source={isDark ? icons.ic_darkdots : icons.ic_dots}
                style={styles.img}
              />
            </TouchableOpacity>

            <Animated.View
              pointerEvents={openEdit ? 'auto' : 'none'}
              style={[
                styles.update,
                {
                  opacity,
                  transform: [{ translateY }],
                },
              ]}
            >
              {(quoteDetails?.status !== 'approved' && 'rejected') &&
              <>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={navigateToEdit}
                style={styles.dropdownItem}
              >
                <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                  Edit
                </InterTightMedium>
              </TouchableOpacity>

                <View style={styles.separator} />
              </>
              }

              <TouchableOpacity onPress={handleDeleteQuote} activeOpacity={0.7} style={styles.dropdownItem}>
                <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                  Delete
                </InterTightMedium>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
          {`${quoteDetails?.title ?? ''} - ${quoteDetails?.client?.name ?? ''}`}
        </InterTightMedium>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}
        >
          <View style={styles.cardContainer}>
            <Card style={styles.cardone}>
              <View style={[styles.status, {backgroundColor: statusColors.view}]}>
                <InterTightMedium fsize={14} fcolor={statusColors.text}>
                  {quoteDetails?.status}
                </InterTightMedium>
              </View>
              <TouchableOpacity onPress={() => setOpen(true)}>
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
                  value={quoteDetails?.reference_number}
                />
                <InfoRow label="Created On" value={quoteDetails?.quote_date} />
                <InfoRow
                  label="Expiry Date"
                  value={quoteDetails?.expiry_date}
                />
              </View>
              <View style={styles.empty} />
              <View style={styles.inforow}>
                <View style={styles.infocard}>
                  <Image
                    source={isDark ? icons.ic_darkbg2 : icons.ic_badge2}
                    style={styles.img}
                  />
                  <CardHeader title="Job Description" />
                </View>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  {quoteDetails?.job_description}
                  {/* <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                    more...
                  </InterTightMedium> */}
                </InterTightRegular>
              </View>

              <View style={styles.empty} />

              <View style={styles.inforow}>
                <View style={styles.infocard}>
                  <Image
                    source={isDark ? icons.ic_darkbg2 : icons.ic_badge2}
                    style={styles.img}
                  />
                  <CardHeader title="Notes (Not visible on quote)" />
                </View>
                <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                  {quoteDetails?.notes}
                  {/* <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                    more...
                  </InterTightMedium> */}
                </InterTightRegular>
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
                    {quoteDetails?.client?.name}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image
                    source={isDark ? icons.ic_dark2 : icons.ic_call}
                    style={styles.img}
                  />
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {quoteDetails?.client?.phone}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image
                    source={isDark ? icons.ic_dark3 : icons.ic_gmail}
                    style={styles.img}
                  />
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {quoteDetails?.client?.email}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image
                    source={isDark ? icons.ic_dark4 : icons.ic_location}
                    style={styles.img}
                  />
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    {quoteDetails?.client?.address}
                  </InterTightRegular>
                </View>
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
                  value={`£${quoteDetails?.financial_summary.sub_total}`}
                />
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
                  value={`£${quoteDetails?.financial_summary.tax}`}
                />
                <InfoRow
                  label="Discount (20%)"
                  value={`£${quoteDetails?.financial_summary.discount}`}
                />

                <View style={styles.empty} />
                <InfoRow
                  label="Grand Total"
                  value={`£${quoteDetails?.financial_summary.grand_total}`}
                />
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
                {quoteDetails?.items.map((item: FetchItemsData, index) => {
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
                      {index !== quoteDetails.items.length - 1 && (
                        <View style={styles.empty} />
                      )}
                    </View>
                  );
                })}
              </View>
            </Card>

            <Card style={styles.cardtwo}>
              <View style={styles.infocard}>
                <Image
                  source={isDark ? icons.ic_darkbg4 : icons.ic_item}
                  style={styles.img}
                />
                <CardHeader title="Sections" />
              </View>
              <View style={styles.expand}>
                {selectedSections?.length > 0 ? (
                  selectedSections.map((section, index) => (
                    <View key={section.id}>
                      <TouchableOpacity
                        style={styles.intro}
                        onPress={() =>
                          navigation.navigate('IntroductionScreen', {
                            order: section.sort,
                            sectionId: section.id,
                            title: section.title,
                            content: section.content,
                          })
                        }
                      >
                        <InterTightRegular
                          fsize={14}
                          fcolor={theme.textPrimary}
                        >
                          {section.title}
                        </InterTightRegular>

                        <Image
                          source={
                            isDark ? icons.ic_darkarrow : icons.ic_rightarrow
                          }
                          style={styles.img}
                        />
                      </TouchableOpacity>

                      {index !== selectedSections.length - 1 && (
                        <View style={styles.empty} />
                      )}
                    </View>
                  ))
                ) : (
                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    No sections available
                  </InterTightRegular>
                )}
              </View>
            </Card>

            <Card>
              <View style={styles.infocard}>
                <Image
                  source={isDark ? icons.ic_darkbg6 : icons.ic_attach}
                  style={styles.img}
                />
                <CardHeader title="Attachments" />
              </View>

              <View style={styles.expand}>
                {quoteDetails?.attachments?.length ? (
                  quoteDetails.attachments.map(
                    (
                      attachment: { id: string; type: string; url: string },
                      index: number,
                    ) => (
                      <View key={attachment.id}>
                        <TouchableOpacity
                          style={styles.intro}
                          onPress={() => handleOpenAttachment(attachment.url)}
                        >
                          <InterTightRegular
                            fsize={14}
                            fcolor={theme.textPrimary}
                          >
                            {getAttachmentName(attachment, index)}
                          </InterTightRegular>

                          <Image
                            source={
                              isDark ? icons.ic_darkarrow : icons.ic_rightarrow
                            }
                            style={styles.img}
                          />
                        </TouchableOpacity>

                        {index !== quoteDetails.attachments.length - 1 && (
                          <View style={styles.empty} />
                        )}
                      </View>
                    ),
                  )
                ) : (
                  <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                    No attachments available
                  </InterTightRegular>
                )}
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
      </View>
      <View style={styles.footer}>
        <View style={styles.footeritem}>
          <ButtonComponent
            bg={theme.background}
            buttonWidth="48.5%"
            bttnTxt="Invoice"
            borderwidth={1}
            borderc="#082B60"
            txtColor={theme.textPrimary}
            gap={8}
          >
            <Image source={icons.ic_addicon} style={styles.addicon} />
          </ButtonComponent>
          <ButtonComponent
            bg={theme.background}
            buttonWidth="48.5%"
            bttnTxt="Duplicate"
            borderwidth={1}
            borderc="#082B60"
            txtColor={theme.textPrimary}
            gap={8}
            onPress={handleDuplicateQuote}
          >
            <Image source={icons.ic_duplicate} style={styles.addicon} />
          </ButtonComponent>
        </View>
      </View>
      <StatusChanger
        visible={open}
        onClose={handleClose}
        onToggleStatus={toggleStatus}
        selectedStatus={selectedStatus}
      />
      <Loader visible={loadingQuoteDetails || loadingDuplicateQuote || loadingDeleteQuote} />
    </LinearGradient>
  );
};

export default QouteDetailScreen;
