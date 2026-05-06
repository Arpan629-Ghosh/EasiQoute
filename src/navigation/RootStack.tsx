import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation.types';
import AuthStack from './authStack/AuthStack';
import MainTabs from './mainTabs/MainTabs';
import QouteDetailScreen from '@/screens/qouteDetailScreen/QouteDetailScreen';
import IntroductionScreen from '@/screens/introductionScreen/IntroductionScreen';
import NewQuoteScreens from '@/screens/newQuoteScreens/NewQuoteScreen';

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
        name='IntroductionScreen'
        component={IntroductionScreen}
        options={{
          title: "Introducton",
          headerShown: false
        }}
      />
      <Stack.Screen
        name='NewQuoteScreens'
        component={NewQuoteScreens}
        options={{
          title: "New Quote",
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
