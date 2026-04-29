import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation.types';
import AuthStack from './authStack/AuthStack';
import MainTabs from './mainTabs/MainTabs';

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
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
