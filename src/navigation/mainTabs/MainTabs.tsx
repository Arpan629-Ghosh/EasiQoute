import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/homeScreen/HomeScreen';
import QoutesStack from './mainStack/QoutesStack';
import InvoicesStack from './mainStack/InvoicesStack';
import ClientStack from './mainStack/ClientStack';
import SettingsStack from './mainStack/SettingsStack';
import HomeIcon from '@/components/tabBarIcons/homeIcon/HomeIcon';
import QouteIcon from '@/components/tabBarIcons/qouteIcon/QouteIcon';
import InvoiceIcon from '@/components/tabBarIcons/invoiceIcon/InvoiceIcon';
import ClientIcon from '@/components/tabBarIcons/clientIcon/ClientIcon';
import SettingIcon from '@/components/tabBarIcons/settingIcon/SettingIcon';
import { fontFamily } from '@/constants/fontFamily';

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#082B60',
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon focused={focused} color={color} size={size} />
          ),

          tabBarLabelStyle: {
            fontFamily: fontFamily.INTER_TIGHT.regular,
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="Qoute"
        component={QoutesStack}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#082B60',
          tabBarIcon: ({ focused, color, size }) => (
            <QouteIcon focused={focused} color={color} size={size} />
          ),

          tabBarLabelStyle: {
            fontFamily: fontFamily.INTER_TIGHT.regular,
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="Invoices"
        component={InvoicesStack}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#082B60',
          tabBarIcon: ({ focused, color, size }) => (
            <InvoiceIcon focused={focused} color={color} size={size} />
          ),

          tabBarLabelStyle: {
            fontFamily: fontFamily.INTER_TIGHT.regular,
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientStack}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#082B60',
          tabBarIcon: ({ focused, color, size }) => (
            <ClientIcon focused={focused} color={color} size={size} />
          ),

          tabBarLabelStyle: {
            fontFamily: fontFamily.INTER_TIGHT.regular,
            fontSize: 12,
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#082B60',
          tabBarIcon: ({ focused, color, size }) => (
            <SettingIcon focused={focused} color={color} size={size} />
          ),

          tabBarLabelStyle: {
            fontFamily: fontFamily.INTER_TIGHT.regular,
            fontSize: 12,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
