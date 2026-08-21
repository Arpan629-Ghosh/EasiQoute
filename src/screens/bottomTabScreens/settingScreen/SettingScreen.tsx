import {
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightSemiBold from '@/components/appFonts/InterTightSemiBold';
import Card from '@/components/cardDetailsComponent/Card';
import InterTightMedium from '@/components/appFonts/InterTightMedium';
import { icons } from '@/config/icons';
import SettingInfoRow from '@/components/cardDetailsComponent/SettingInfoRow';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import CustomToggle from '@/components/switch/CustomToggle';
import AppearanceBottomSheet from '@/components/appearanceBottomSheet/AppearanceBottomSheet';
import LogoutModal from '@/components/ logoutModal/LogoutModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingStackProps } from '@/types/navigation.types';
import { useAppLanguage } from '@/hooks/useAppLanguage';
import LanguageBottomSheet from '@/components/languageBottomSheet/LanguageBottomSheet';
import { useTranslation } from 'react-i18next';
import AppImage from '@/components/appImage/AppImage';
import { useGetUserDetails } from '@/hooks/apis/useGetUserDetails';

const SettingScreen = ({ navigation }: SettingStackProps<'SettingScreen'>) => {
  const [enabledStripe, setEnabledStripe] = useState<boolean>(false);
  const [pushNotification, setPushNotification] = useState<boolean>(true);
  const [emailUpdate, setEmailUpdate] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openLangSheet, setOpenLangSheet] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const { theme, isDark, mode } = useAppTheme();
  const { language, languageMode, isDeviceLanguage } = useAppLanguage();
  const { t } = useTranslation();
  const { userDetails } = useGetUserDetails();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToPaymentInfo = () => {
    navigation.navigate('PaymentInfoScreen');
  };

  const navigateToBillingPreferences = () => {
    navigation.navigate('BillingPreferencesScreen');
  };

  const navigateToTeamMember = () => {
    navigation.navigate('TeamMembersScreen');
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const navigateToQIScreen = () => {
    navigation.navigate('QuoteAndInvoicesSettingScreen');
  };

  const navigateToCategories = () => {
    navigation.navigate('CategoriesScreen');
  };
  const navigateToSubCategory = () => {
    navigation.navigate('SubCategoriesScreen');
  };
  const navigateToItems = () => {
    navigation.navigate('ItemsScreen');
  };
  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen', {
      isEdit: true,
      name: userDetails?.name,
      phone: userDetails?.phone,
      url: userDetails?.avatar
    })
  }

  const navigateToBusiness = () => {
    navigation.navigate('BusinessScreen', {
      isEdit: true,
      name: userDetails?.company?.name,
      phone: userDetails?.company?.phone_number,
      color: userDetails?.company?.brand_color,
      profileImage: userDetails?.company?.logo,
      vatNumber: userDetails?.company?.vat_number,
      services: null,
      address: userDetails?.company?.address
    })
  }

  const handleClose = useCallback(() => {
    setOpen(false);
  },[]);
  const handleCloseLang = useCallback(() => {
    setOpenLangSheet(false);
  },[]);
  const handleLogoutModalClose = useCallback(() => {
    setOpenLogoutModal(false);
  }, []);

  console.log("language: ", language);
  console.log("languageMode: ", languageMode);
  console.log("isDeviceLanguage: ", isDeviceLanguage);


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

      <View style={[styles.header, { paddingTop: insets.top }]}>
        <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
          {t('settings.title')}
        </InterTightSemiBold>
      </View>

      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentcontainer}
      >
        <View style={styles.content}>
          <Card style={styles.card}>
            <View style={styles.profile}>
              <View style={styles.profilepic}>
                <AppImage
                  uri={userDetails?.avatar}
                  style={styles.profilepic}
                  
                />
              </View>
              <View style={styles.txt}>
                <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                  {userDetails?.name}
                </InterTightMedium>
                <TouchableOpacity
                  style={styles.editproflie}
                  onPress={navigateToProfile}
                >
                  <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
                    {t('settings.profile.editProfile')}
                  </InterTightMedium>
                  <Image source={icons.ic_arrowicn} style={styles.icn} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToBusiness}>
              <SettingInfoRow
                icon={icons.ic_business}
                txt={t('settings.profile.businessInformation')}
              />
            </TouchableOpacity>
          </Card>

          <Card style={styles.card}>
            <CardHeader title={t('settings.personalisation.title')} />
            <View style={styles.borderLine} />

            <SettingInfoRow
              icon={icons.ic_subscription}
              txt={t('settings.personalisation.subscriptionBilling')}
            />
            <View style={styles.borderLine} />

            <TouchableOpacity onPress={navigateToTeamMember}>
              <SettingInfoRow
                icon={icons.ic_teams}
                txt={t('settings.personalisation.teamMembers')}
              />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <SettingInfoRow
                icon={icons.ic_appearance}
                txt={t('settings.personalisation.appearance')}
              >
                <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
                  {mode}
                </InterTightMedium>
              </SettingInfoRow>
            </TouchableOpacity>
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={() => setOpenLangSheet(true)}>
              <SettingInfoRow
                icon={icons.ic_appearance}
                txt={t('settings.personalisation.language')}
              >
                <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
                  {languageMode === 'Device'
                    ? 'Device'
                    : languageMode === 'bn'
                    ? 'বাংলা'
                    : languageMode === 'en'
                    ? 'English'
                    : languageMode === 'hi'
                    ? 'हिन्दी'
                    : ' ગુજરાતી'}
                </InterTightMedium>
              </SettingInfoRow>
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <CardHeader title={t('settings.paymentsInvoicing.title')} />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_stripe}
              txt={t('settings.paymentsInvoicing.connectStripe')}
              arrowEnabled={false}
            >
              <CustomToggle value={enabledStripe} onToggle={setEnabledStripe} />
            </SettingInfoRow>
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToPaymentInfo}>
              <SettingInfoRow
                icon={icons.ic_pinfo}
                txt={t('settings.paymentsInvoicing.paymentInfo')}
              />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToBillingPreferences}>
              <SettingInfoRow
                icon={icons.ic_billing}
                txt={t('settings.paymentsInvoicing.billingPreferences')}
              />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToQIScreen}>
              <SettingInfoRow
                icon={icons.ic_qtinv}
                txt={t('settings.paymentsInvoicing.quoteInvoiceSettings')}
              />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <CardHeader title={t('settings.inventorySetup.title')} />
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToCategories}>
              <SettingInfoRow
                icon={icons.ic_categories}
                txt={t('settings.inventorySetup.categories')}
              />
            </TouchableOpacity>
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToSubCategory}>
              <SettingInfoRow
                icon={icons.ic_subcategories}
                txt={t('settings.inventorySetup.subcategories')}
              />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToItems}>
              <SettingInfoRow
                icon={icons.ic_itemsicn}
                txt={t('settings.inventorySetup.items')}
              />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <CardHeader title={t('settings.notifications.title')} />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_push}
              txt={t('settings.notifications.pushNotifications')}
              arrowEnabled={false}
            >
              <CustomToggle
                value={pushNotification}
                onToggle={setPushNotification}
              />
            </SettingInfoRow>
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_emailicn}
              txt={t('settings.notifications.emailUpdates')}
              arrowEnabled={false}
            >
              <CustomToggle value={emailUpdate} onToggle={setEmailUpdate} />
            </SettingInfoRow>
          </Card>
          <Card style={styles.card}>
            <CardHeader title={t('settings.supportLegal.title')} />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_video}
              txt={t('settings.supportLegal.vendorTutorials')}
            />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_contacticn}
              txt={t('settings.supportLegal.contactSupport')}
            />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_tos}
              txt={t('settings.supportLegal.termsOfService')}
            />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_pp}
              txt={t('settings.supportLegal.privacyPolicy')}
            />
          </Card>

          <Card style={styles.card}>
            <CardHeader title={t('settings.accountSettings.title')} />
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToChangePassword}>
              <SettingInfoRow
                icon={icons.ic_cp}
                txt={t('settings.accountSettings.changePassword')}
              />
            </TouchableOpacity>
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_deleteicn}
              txt={t('settings.accountSettings.deleteAccount')}
            />
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={() => setOpenLogoutModal(true)}>
              <SettingInfoRow
                icon={icons.ic_logout}
                txt={t('settings.accountSettings.logout')}
              />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
      <AppearanceBottomSheet visible={open} onClose={handleClose} />
      <LanguageBottomSheet visible={openLangSheet} onClose={handleCloseLang} />
      <LogoutModal visible={openLogoutModal} onClose={handleLogoutModalClose} />
    </LinearGradient>
  );
};

export default SettingScreen;
