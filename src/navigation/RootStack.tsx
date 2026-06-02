import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation.types';
import MainTabs from './mainTabs/MainTabs';
import QouteDetailScreen from '@/screens/quotesScreens/qouteDetailScreen/QouteDetailScreen';
import IntroductionScreen from '@/screens/quotesScreens/introductionScreen/IntroductionScreen';
import NewQuoteScreens from '@/screens/quotesScreens/newQuoteScreens/NewQuoteScreen';
import TemplatesScreen from '@/screens/quotesScreens/newQuoteScreens/templatesScreen/TemplatesScreen';
import AddMemberScreen from '@/screens/settingsScreens/teamMemberScreens/addMemberScreen/AddMemberScreen';
import ChangePasswordScreen from '@/screens/settingsScreens/changePasswordScreen/ChangePasswordScreen';
import TeamMembersScreen from '@/screens/settingsScreens/teamMemberScreens/teamMemberScreen/TeamMembersScreen';
import QuoteAndInvoiceSettingsScreen from '@/screens/settingsScreens/paymentAndInvoicingScreens/quoteAndInvoiceSettingsScreen/QuoteAndInvoicesSettingsScreen';
import BillingPreferencesScreen from '@/screens/settingsScreens/paymentAndInvoicingScreens/billingPreferencesScreen/BillingPreferencesScreen';
import PaymentInfoScreen from '@/screens/settingsScreens/paymentAndInvoicingScreens/paymentInfoScreen/PaymentInfoScreen';
import CategoriesScreen from '@/screens/settingsScreens/inventorySetupScreens/categoriesScreen/CategoriesScreen';
import NewCategoryScreen from '@/screens/settingsScreens/inventorySetupScreens/newCategoryScreen/NewCategoryScreen';
import SubCategoriesScreen from '@/screens/settingsScreens/inventorySetupScreens/subCategoriesScreen/SubCategoriesScreen';
import NewSubCategoryScreen from '@/screens/settingsScreens/inventorySetupScreens/newSubCategoriesScreen/NewSubCategoryScreen';
import ItemsScreen from '@/screens/settingsScreens/inventorySetupScreens/itemsScreen/ItemsScreen';
import NewItemsScreen from '@/screens/settingsScreens/inventorySetupScreens/createNewItemsScreen/NewItemsScreen';
import LoginScreen from '@/screens/authAndProfileSetupScreens/authScreens/loginScreen/LoginScreen';
import RegisterScreen from '@/screens/authAndProfileSetupScreens/authScreens/registerScreen/RegisterScreen';
import ResetPasswordScreen from '@/screens/authAndProfileSetupScreens/authScreens/resetPasswordScreen/ResetPasswordScreen';
import IntroScreen from '@/screens/authAndProfileSetupScreens/introScreens/IntroScreen/IntroScreen';
import ProfileScreen from '@/screens/authAndProfileSetupScreens/profileScreens/ProfileScreen/ProfileScreen';
import BusinessScreen from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessScreen/BusinessScreen';
import BusinessAddressScreen from '@/screens/authAndProfileSetupScreens/profileScreens/businessSetupScreens/businessAddressScren/BusinessAddressScreen';
import { useAuth } from '@/hooks/apis/useAuth';
import NewSectionScreen from '@/screens/quotesScreens/newQuoteScreens/newSectionScreen/NewSectionScreen';
import AddClientScreen from '@/screens/clientScreens/addClientScreen/AddClientScreen';
import ClientDetailScreen from '@/screens/clientScreens/clientDetailScreen/ClientDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = () => {
  const { user } = useAuth();
  // console.log(user)
  const getInitialScreen = () => {
    if (!user || !user.is_email_verified) return 'LoginScreen';
    if (!user?.is_profile_setup) return 'IntroScreen';
    if (!user?.is_company_profile_setup) return 'BusinessScreen';
    else return 'MainTabs';
  };
  return (
    <Stack.Navigator
      initialRouteName={getInitialScreen()}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />

      <Stack.Screen name="IntroScreen" component={IntroScreen} />

      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

      <Stack.Screen name="BusinessScreen" component={BusinessScreen} />

      <Stack.Screen
        name="BusinessAddressScreen"
        component={BusinessAddressScreen}
      />

      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="QouteDetailScreen" component={QouteDetailScreen} />
      <Stack.Screen name="IntroductionScreen" component={IntroductionScreen} />
      <Stack.Screen name="NewQuoteScreens" component={NewQuoteScreens} />
      <Stack.Screen name="TemplatesScreen" component={TemplatesScreen} />

      <Stack.Screen name="TeamMembersScreen" component={TeamMembersScreen} />

      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} />

      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name="QuoteAndInvoicesSettingScreen"
        component={QuoteAndInvoiceSettingsScreen}
      />

      <Stack.Screen
        name="BillingPreferencesScreen"
        component={BillingPreferencesScreen}
      />

      <Stack.Screen name="PaymentInfoScreen" component={PaymentInfoScreen} />

      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />

      <Stack.Screen name="NewCategoryScreen" component={NewCategoryScreen} />

      <Stack.Screen
        name="SubCategoriesScreen"
        component={SubCategoriesScreen}
      />

      <Stack.Screen
        name="NewSubCategoryScreen"
        component={NewSubCategoryScreen}
      />

      <Stack.Screen name="ItemsScreen" component={ItemsScreen} />

      <Stack.Screen name="NewItemsScreen" component={NewItemsScreen} />
      <Stack.Screen name="NewSectionScreen" component={NewSectionScreen} />
      <Stack.Screen name="AddClientScreen" component={AddClientScreen} />
      <Stack.Screen name="ClientDetailScreen" component={ClientDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
