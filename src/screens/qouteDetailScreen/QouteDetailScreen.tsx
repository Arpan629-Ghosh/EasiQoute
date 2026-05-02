import { Image, ScrollView, StatusBar, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
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

const QouteDetailScreen = ({ navigation }: QouteDetailScreenProps) => {

  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const navigateToBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    setOpen(false)
  }

  const toggleStatus = (type : string) => {
    setSelectedStatus((prev) => {
       const isSelected = prev.includes(type)
      const updatedStatus = isSelected ? "" : type
      return updatedStatus
    })
  }
  return (
    <LinearGradient colors={['#F2EEEC', '#E8E8F2']} style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={styles.headerComponent}>
          <ButtonComponent onPress={navigateToBack}>
            <Image source={icons.ic_back} style={styles.img} />
          </ButtonComponent>

          <Image source={icons.ic_dots} style={styles.img} />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <InterTightMedium fsize={20} fcolor="#2D2D2D">
          Office Renovation Gold Package – {'      '} Acme Corp
        </InterTightMedium>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            <Card style={styles.cardone}>
              <View style={styles.status}>
                <InterTightMedium fsize={14} fcolor="#F97315">
                  Draft
                </InterTightMedium>
              </View>
              <ButtonComponent onPress={() => setOpen(true)}>
                <Image source={images.img_status} style={styles.statusimg} />
              </ButtonComponent>
            </Card>

            <Card>
              <View style={styles.inforow}>
                <View style={styles.infocard}>
                  <Image source={icons.ic_badge1} style={styles.img} />
                  <CardHeader title="Basic Information" />
                </View>

                <InfoRow label="Quote Ref" value="QT-2025-0418-012" />
                <InfoRow label="Created On" value="15 Apr 2025" />
                <InfoRow label="Expiry Date" value="27 Oct 2025" />
              </View>
              <View style={styles.empty} />
              <View style={styles.inforow}>
                <View style={styles.infocard}>
                  <Image source={icons.ic_badge2} style={styles.img} />
                  <CardHeader title="Job Description" />
                </View>
                <InterTightRegular fsize={14} fcolor="#89909D">
                  This quote covers the renovation of Acme Corp’s{'         '}{' '}
                  office space, including material supply, floor tiling, and
                  partition adjustments. It also includes labor for{' '}
                  <InterTightMedium fsize={14} fcolor="#2D2D2D">
                    more...
                  </InterTightMedium>
                </InterTightRegular>
              </View>

              <View style={styles.empty} />

              <View style={styles.inforow}>
                <View style={styles.infocard}>
                  <Image source={icons.ic_badge2} style={styles.img} />
                  <CardHeader title="Notes (Not visible on quote)" />
                </View>
                <InterTightRegular fsize={14} fcolor="#89909D">
                  This quote covers the renovation of Acme Corp’s{'         '}{' '}
                  office space, including material supply, floor tiling, and
                  partition adjustments. It also includes labor for{' '}
                  <InterTightMedium fsize={14} fcolor="#2D2D2D">
                    more...
                  </InterTightMedium>
                </InterTightRegular>
              </View>
            </Card>

            <Card style={styles.cardtwo}>
              <View style={styles.infocard}>
                <Image source={icons.ic_badge3} style={styles.img} />
                <CardHeader title="Client Details" />
              </View>
              <View style={styles.contact}>
                <View style={styles.contactdetail}>
                  <Image source={icons.ic_logo} style={styles.img} />
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    Acme Corp
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image source={icons.ic_call} style={styles.img} />
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    (+44) 489-7895-200{' '}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image source={icons.ic_gmail} style={styles.img} />
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    acmegroup@gmail.com{' '}
                  </InterTightRegular>
                </View>
                <View style={styles.contactdetail}>
                  <Image source={icons.ic_location} style={styles.img} />
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    1600 Amphitheatre Driveway Parkway Standalone Mountain View,
                    CA 94043{' '}
                  </InterTightRegular>
                </View>
              </View>
            </Card>
            <Card>
              <View style={styles.inforow}>
                <View style={styles.infocard}>
                  <Image source={icons.ic_badge4} style={styles.img} />
                  <CardHeader title="Financial Summary" />
                </View>
                <InfoRow label="Sub-total" value="£2,050.00" />
                <View style={styles.margin}>
                  <InfoRow label="Margin (50%)" />
                  <InterTightRegular
                    fsize={14}
                    fcolor="#082B60"
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
                <Image source={icons.ic_section} style={styles.img} />
                <CardHeader title="Items" />
              </View>
              <View style={styles.expand}>
                <ExpandableItem title="Cement Bags">
                  <View />
                </ExpandableItem>
                <View style={styles.empty} />

                <ExpandableItem title="Floor Tiling">
                  <View />
                </ExpandableItem>
                <View style={styles.empty} />
                <ExpandableItem title="Labor Charges">
                  <View />
                </ExpandableItem>
              </View>
            </Card>

            <Card style={styles.cardtwo}>
              <View style={styles.infocard}>
                <Image source={icons.ic_item} style={styles.img} />
                <CardHeader title="Sections" />
              </View>
              <View style={styles.expand}>
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    Introduction
                  </InterTightRegular>
                  <Image source={icons.ic_rightarrow} style={styles.img} />
                </View>
                <View style={styles.empty} />
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    About Us
                  </InterTightRegular>
                  <Image source={icons.ic_rightarrow} style={styles.img} />
                </View>
              </View>
            </Card>

            <Card>
              <View style={styles.infocard}>
                <Image source={icons.ic_attach} style={styles.img} />
                <CardHeader title="Attachments" />
              </View>
              <View style={styles.expand}>
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    laborattachment.PDF
                  </InterTightRegular>
                  <Image source={icons.ic_rightarrow} style={styles.img} />
                </View>
                <View style={styles.empty} />
                <View style={styles.intro}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    IMGLeak.PNG{' '}
                  </InterTightRegular>
                  <Image source={icons.ic_rightarrow} style={styles.img} />
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
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    INV-2025-101
                  </InterTightRegular>
                  <InterTightRegular fsize={14} fcolor="#89909D">
                    £4,500
                  </InterTightRegular>
                </View>
                <View style={styles.invst}>
                  <InterTightMedium fsize={12} fcolor="#2D2D2D">
                    Overdue
                  </InterTightMedium>
                </View>
              </View>
              <View style={styles.empty} />
              <View style={styles.invoice}>
                <View style={styles.txt}>
                  <InterTightRegular fsize={14} fcolor="#2D2D2D">
                    INV-2025-101
                  </InterTightRegular>
                  <InterTightRegular fsize={14} fcolor="#89909D">
                    £4,500
                  </InterTightRegular>
                </View>
                <View style={styles.invst}>
                  <InterTightMedium fsize={12} fcolor="#2D2D2D">
                    Overdue
                  </InterTightMedium>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.footeritem}>
          <ButtonComponent style={styles.bttn}>
            <Image source={icons.ic_addicon} style={styles.addicon} />
            <InterTightMedium fsize={16} fcolor="#082B60">
              Invoice
            </InterTightMedium>
          </ButtonComponent>
          <ButtonComponent style={styles.bttn}>
            <Image source={icons.ic_duplicate} style={styles.addicon} />
            <InterTightMedium fsize={16} fcolor="#082B60">
              Duplicate
            </InterTightMedium>
          </ButtonComponent>
        </View>
      </View>
      <StatusChanger
        visible={open}
        onClose={handleClose}
        onToggleStatus={toggleStatus}
        selectedStatus = {selectedStatus}
      />
    </LinearGradient>
  );
};

export default QouteDetailScreen;
