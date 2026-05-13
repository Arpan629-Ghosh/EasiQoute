import {
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { createStyles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';
import Card from '@/components/cardDetailsComponent/Card';
import { images } from '@/config/images';
import InterTightMedium from '@/components/fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import SettingInfoRow from '@/components/cardDetailsComponent/SettingInfoRow';
import CardHeader from '@/components/cardDetailsComponent/CardHeader';
import CustomToggle from '@/components/switch/CustomToggle';
import AppearanceBottomSheet from '@/components/appearanceBottomSheet/AppearanceBottomSheet';
import LogoutModal from '@/components/ logoutModal/LogoutModal';
import { SettingScreenProps } from '@/types/navigation.types';

const SettingScreen = ({navigation} : SettingScreenProps) => {
  const [enabledStripe, setEnabledStripe] = useState<boolean>(false);
  const [pushNotification, setPushNotification] = useState<boolean>(true);
  const [emailUpdate, setEmailUpdate] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const { theme, isDark, mode } = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToPaymentInfo = () => {
    navigation.navigate("PaymentInfoScreen")
  }

  const navigateToBillingPreferences = () => {
    navigation.navigate("BillingPreferencesScreen")
  }

  const navigateToTeamMember = () => {
    navigation.navigate("TeamMembersScreen")
  }

  const navigateToChangePassword = () => {
    navigation.navigate("ChangePasswordScreen");
  }

  const navigateToQIScreen = () => {
    navigation.navigate("QuoteAndInvoicesSettingScreen")
  }

  const navigateToCategories = () => {
    navigation.navigate("CategoriesScreen")
  }
  const navigateToSubCategory = () => {
    navigation.navigate("SubCategoriesScreen")
  }
  const navigateToItems = () => {
    navigation.navigate("ItemsScreen")
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogoutModalClose = () => {
    setOpenLogoutModal(false);
  };

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
        <InterTightSemiBold fsize={24} fcolor={theme.textPrimary}>
          Settings
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
                <Image
                  source={images.img_darkprofile}
                  style={styles.profilepic}
                />
              </View>
              <View style={styles.txt}>
                <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
                  Emma Wellington
                </InterTightMedium>
                <View style={styles.editproflie}>
                  <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
                    Edit Profile
                  </InterTightMedium>
                  <Image source={icons.ic_arrowicn} style={styles.icn} />
                </View>
              </View>
            </View>
            <View style={styles.borderLine} />

            <SettingInfoRow
              icon={icons.ic_business}
              txt="Business Information"
            />
          </Card>

          <Card style={styles.card}>
            <CardHeader title="Personalisation" />
            <View style={styles.borderLine} />

            <SettingInfoRow
              icon={icons.ic_subscription}
              txt="Subscription & Billing"
            />
            <View style={styles.borderLine} />

            <TouchableOpacity onPress={navigateToTeamMember}>
              <SettingInfoRow icon={icons.ic_teams} txt="Team Members" />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <SettingInfoRow icon={icons.ic_appearance} txt="Appearance">
                <InterTightMedium fsize={14} fcolor={theme.textSecondary}>
                  {mode}
                </InterTightMedium>
              </SettingInfoRow>
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <CardHeader title="Payments & Invoicing" />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_stripe}
              txt="Connect Stripe"
              arrowEnabled={false}
            >
              <CustomToggle value={enabledStripe} onToggle={setEnabledStripe} />
            </SettingInfoRow>
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToPaymentInfo}>
              <SettingInfoRow icon={icons.ic_pinfo} txt="Payment Info" />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToBillingPreferences}>
              <SettingInfoRow
                icon={icons.ic_billing}
                txt="Billing Preferences"
              />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToQIScreen}>
              <SettingInfoRow
                icon={icons.ic_qtinv}
                txt="Quote & Invoice Settings"
              />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <CardHeader title="Inventory Setup" />
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToCategories}>
              <SettingInfoRow icon={icons.ic_categories} txt="Categories" />
            </TouchableOpacity>
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToSubCategory}>
              <SettingInfoRow
                icon={icons.ic_subcategories}
                txt="Subcategories"
              />
            </TouchableOpacity>

            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToItems}>
              <SettingInfoRow icon={icons.ic_itemsicn} txt="Items" />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <CardHeader title="Notifications" />
            <View style={styles.borderLine} />
            <SettingInfoRow
              icon={icons.ic_push}
              txt="Push Notifications"
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
              txt="Email Updates"
              arrowEnabled={false}
            >
              <CustomToggle value={emailUpdate} onToggle={setEmailUpdate} />
            </SettingInfoRow>
          </Card>
          <Card style={styles.card}>
            <CardHeader title="Support & Legal" />
            <View style={styles.borderLine} />
            <SettingInfoRow icon={icons.ic_video} txt="Video Tutorials" />
            <View style={styles.borderLine} />
            <SettingInfoRow icon={icons.ic_contacticn} txt="Contact Support" />
            <View style={styles.borderLine} />
            <SettingInfoRow icon={icons.ic_tos} txt="Terms of Service" />
            <View style={styles.borderLine} />
            <SettingInfoRow icon={icons.ic_pp} txt="Privacy Policy" />
          </Card>

          <Card style={styles.card}>
            <CardHeader title="Account Settings" />
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={navigateToChangePassword}>
              <SettingInfoRow icon={icons.ic_cp} txt="Change Password" />
            </TouchableOpacity>
            <View style={styles.borderLine} />
            <SettingInfoRow icon={icons.ic_deleteicn} txt="Delete Account" />
            <View style={styles.borderLine} />
            <TouchableOpacity onPress={() => setOpenLogoutModal(true)}>
              <SettingInfoRow icon={icons.ic_logout} txt="Logout" />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
      <AppearanceBottomSheet visible={open} onClose={handleClose} />
      <LogoutModal visible={openLogoutModal} onClose={handleLogoutModalClose} />
    </LinearGradient>
  );
};

export default SettingScreen;
