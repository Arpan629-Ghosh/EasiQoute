import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation.types';
import AuthStack from './authStack/AuthStack';
import MainTabs from './mainTabs/MainTabs';
import QouteDetailScreen from '@/screens/mainTabScreens/quoteScreens/qouteDetailScreen/QouteDetailScreen';
import IntroductionScreen from '@/screens/mainTabScreens/quoteScreens/introductionScreen/IntroductionScreen';
import NewQuoteScreens from '@/screens/mainTabScreens/quoteScreens/newQuoteScreens/NewQuoteScreen';
import TemplatesScreen from '@/screens/mainTabScreens/quoteScreens/newQuoteScreens/templatesScreen/TemplatesScreen';
import AddMemberScreen from '@/screens/mainTabScreens/settingScreens/teamMemberScreens/addMemberScreen/AddMemberScreen';
import ChangePasswordScreen from '@/screens/mainTabScreens/settingScreens/changePasswordScreen/ChangePasswordScreen';
import TeamMembersScreen from '@/screens/mainTabScreens/settingScreens/teamMemberScreens/teamMemberScreen/TeamMembersScreen';
import QuoteAndInvoiceSettingsScreen from '@/screens/mainTabScreens/settingScreens/paymentAndInvoicing/quoteAndInvoiceSettingsScreen/QuoteAndInvoicesSettingsScreen';
import BillingPreferencesScreen from '@/screens/mainTabScreens/settingScreens/paymentAndInvoicing/billingPreferencesScreen/BillingPreferencesScreen';
import PaymentInfoScreen from '@/screens/mainTabScreens/settingScreens/paymentAndInvoicing/paymentInfoScreen/PaymentInfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QouteDetailScreen"
        component={QouteDetailScreen}
        options={{
          title: 'Quote Detail',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IntroductionScreen"
        component={IntroductionScreen}
        options={{
          title: 'Introducton',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewQuoteScreens"
        component={NewQuoteScreens}
        options={{
          title: 'New Quote',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TemplatesScreen"
        component={TemplatesScreen}
        options={{
          title: 'Templates',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TeamMembersScreen"
        component={TeamMembersScreen}
        options={{
          title: 'Team Member',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddMemberScreen"
        component={AddMemberScreen}
        options={{
          title: 'Add Member',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="QuoteAndInvoicesSettingScreen"
        component={QuoteAndInvoiceSettingsScreen}
        options={{
          title: 'QI Settings',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BillingPreferencesScreen"
        component={BillingPreferencesScreen}
        options={{
          title: "billing preferences",
          headerShown: false
        }}
      />

      <Stack.Screen
        name='PaymentInfoScreen'
        component={PaymentInfoScreen}
        options={{
          title: "payment info",
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
