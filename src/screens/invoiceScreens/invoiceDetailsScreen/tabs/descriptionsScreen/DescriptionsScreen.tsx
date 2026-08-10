import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import Card from '@/components/cardDetailsComponent/Card';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import { icons } from '@/config/icons';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import { useToast } from '@/hooks/useToast';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInvoice } from '@/hooks/apis/useInvoice';

const DescriptionsScreen = () => {
  const insets = useSafeAreaInsets();
  const { invoiceDetails } = useInvoice();
  const { showToast } = useToast();
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleOpenAttachment = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showToast('Unable to open attachment', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Failed to open attachment', 'error');
    }
  };

  const getAttachmentName = (attachment: { type: string }, index: number) => {
    return `Attachment ${index + 1}.${attachment.type}`;
  };

  const handleShare = async() => {
      try {
        await Share.share({
          message: `Check out this invoice ${invoiceDetails?.url}`
        })
      } catch (error) {
        console.error(error)
      }
    }


  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.content}>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.cardContainer}>
          <Card>
            <View style={styles.inforow}>
              <View style={styles.infocard}>
                <Image
                  source={isDark ? icons.ic_darkbg2 : icons.ic_badge2}
                  style={styles.img}
                />
                <CardHeader title="Job Description" />
              </View>
              <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
                {invoiceDetails?.message}
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
                {invoiceDetails?.notes}
                {/* <InterTightMedium fsize={14} fcolor={theme.textPrimary}>
                    more...
                  </InterTightMedium> */}
              </InterTightRegular>
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
              {invoiceDetails?.attachments?.length ? (
                invoiceDetails.attachments.map(
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

                      {index !== invoiceDetails.attachments.length - 1 && (
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
            onPress={handleShare}
          >
            <Image source={icons.ic_share} style={styles.addicon} />
          </ButtonComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DescriptionsScreen;
