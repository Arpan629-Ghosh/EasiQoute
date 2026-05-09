import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation.types';
import AuthStack from './authStack/AuthStack';
import MainTabs from './mainTabs/MainTabs';
import QouteDetailScreen from '@/screens/mainTabScreens/quoteScreens/qouteDetailScreen/QouteDetailScreen';
import IntroductionScreen from '@/screens/mainTabScreens/quoteScreens/introductionScreen/IntroductionScreen';
import NewQuoteScreens from '@/screens/mainTabScreens/quoteScreens/newQuoteScreens/NewQuoteScreen';
import TemplatesScreen from '@/screens/mainTabScreens/quoteScreens/newQuoteScreens/templatesScreen/TemplatesScreen';

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
          title: "Templates",
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
