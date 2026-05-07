import { Image, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from './style';
import { icons } from '@/config/icons';
import LinearGradient from 'react-native-linear-gradient';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import Card from '@/components/quoteDetailCard/Card';
import { images } from '@/config/images';
import CardHeader from '@/components/quoteDetailCard/CardHeader';
import InfoRow from '@/components/quoteDetailCard/InfoRow';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import ExpandableItem from '@/components/quoteDetailCard/ExpandableItem';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { QouteDetailScreenProps } from '@/types/navigation.types';
import StatusChanger from '@/components/statusChanger/StatusChanger';
import { useAppTheme } from '@/hooks/useAppTheme';
import Items from '@/components/quoteDetailCard/Items';

const QouteDetailScreen = ({ navigation }: QouteDetailScreenProps) => {

  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("")

  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  const navigateToBack = () => {
    navigation.goBack();
  };

  const navigateToIntroduction = () => {
    navigation.navigate("IntroductionScreen")
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  },[])

  const toggleStatus = (type : string) => {
    setSelectedStatus((prev) => {
       const isSelected = prev.includes(type)
      const updatedStatus = isSelected ? "" : type
      return updatedStatus
    })
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
      <View style={styles.header}>
        <View style={styles.headerComponent}>
          <TouchableOpacity onPress={navigateToBack}>
            <Image
              source={isDark ? icons.ic_backwhite : icons.ic_back}
              style={styles.img}
            />
          </TouchableOpacity>

          <Image
            source={isDark ? icons.ic_darkdots : icons.ic_dots}
            style={styles.img}
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <InterTightMedium fsize={20} fcolor={theme.textPrimary}>
          Office Renovation Gold Package – {'       '} Acme Corp
        </InterTightMedium>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}
        >
          <View style={styles.cardContainer}>
            <Card style={styles.cardone}>
              <View style={styles.status}>
                <InterTightMedium fsize={14} fcolor="#F97315">
                  Draft
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

                <InfoRow label="Quote Ref" value="QT-2025-0418-012" />
                <InfoRow label="Created On" value="15 Apr 2025" />
                <InfoRow label="Expiry Date" value="27 Oct 2025" />
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
                  This quote covers the renovation of Acme Corp’s{'         '}{' '}
                  office space, including material supply, floor tiling, and
                  partition adjustments. It also includes labor for{' '}
                  <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                    more...
                  </InterTightMedium>
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
                  This quote covers the renovation of Acme Corp’s{'         '}{' '}
                  office space, including material supply, floor tiling, and
                  partition adjustments. It also includes labor for{' '}
                  <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                    more...
                  </InterTightMedium>
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
                    Acme Corp
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image
                    source={isDark ? icons.ic_dark2 : icons.ic_call}
                    style={styles.img}
                  />
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    (+44) 489-7895-200{' '}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image
                    source={isDark ? icons.ic_dark3 : icons.ic_gmail}
                    style={styles.img}
                  />
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    acmegroup@gmail.com{' '}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image
                    source={isDark ? icons.ic_dark4 : icons.ic_location}
                    style={styles.img}
                  />
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    1600 Amphitheatre Driveway Parkway Standalone Mountain View,
                    CA 94043{' '}
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
                <InfoRow label="Sub-total" value="£2,050.00" />
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
                <InfoRow label="Tax (18%)" value="£369.00" />
                <InfoRow label="Discount (20%)" value="£100.00" />

                <View style={styles.empty} />
                <InfoRow label="Grand Total" value="£2,319.00" />
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
                <ExpandableItem title="Cement Bags">
                  <Items
                    heading="Materials"
                    subHeading1="Quantity"
                    subHeading2="Rate/Unit"
                    subHeading3="Total"
                    value1="50"
                    value2="£25.00"
                    value3="£1,250.00"
                  />
                </ExpandableItem>
                <View style={styles.empty} />

                <ExpandableItem title="Floor Tiling">
                  <Items
                    heading="Materials"
                    subHeading1="Quantity"
                    subHeading2="Rate/Unit"
                    subHeading3="Total"
                    value1="50"
                    value2="£25.00"
                    value3="£1,250.00"
                  />
                </ExpandableItem>
                <View style={styles.empty} />
                <ExpandableItem title="Labor Charges">
                  <Items
                    heading="Materials"
                    subHeading1="Quantity"
                    subHeading2="Rate/Unit"
                    subHeading3="Total"
                    value1="50"
                    value2="£25.00"
                    value3="£1,250.00"
                  />
                </ExpandableItem>
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
                <TouchableOpacity
                  style={styles.intro}
                  onPress={navigateToIntroduction}
                >
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    Introduction
                  </InterTightRegular>

                  <Image
                    source={isDark ? icons.ic_darkarrow : icons.ic_rightarrow}
                    style={styles.img}
                  />
                </TouchableOpacity>
                <View style={styles.empty} />
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    About Us
                  </InterTightRegular>
                  <Image
                    source={isDark ? icons.ic_darkarrow : icons.ic_rightarrow}
                    style={styles.img}
                  />
                </View>
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
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    laborattachment.PDF
                  </InterTightRegular>
                  <Image
                    source={isDark ? icons.ic_darkarrow : icons.ic_rightarrow}
                    style={styles.img}
                  />
                </View>
                <View style={styles.empty} />
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                    IMGLeak.PNG{' '}
                  </InterTightRegular>
                  <Image
                    source={isDark ? icons.ic_darkarrow : icons.ic_rightarrow}
                    style={styles.img}
                  />
                </View>
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
            buttonWidth={169.5}
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
            buttonWidth={169.5}
            bttnTxt="Duplicate"
            borderwidth={1}
            borderc="#082B60"
            txtColor={theme.textPrimary}
            gap={8}
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
    </LinearGradient>
  );
};

export default QouteDetailScreen;
