import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation.types';
import AuthStack from './authStack/AuthStack';
import MainTabs from './mainTabs/MainTabs';
import QouteDetailScreen from '@/screens/qouteDetailScreen/QouteDetailScreen';

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
    </Stack.Navigator>
  );
};

export default RootStack;
