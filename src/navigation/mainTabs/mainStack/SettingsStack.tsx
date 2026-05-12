import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '@/screens/mainTabScreens/settingScreens/mainSettingScreen/SettingScreen';
import { SettingStackParamList } from '@/types/navigation.types';

const Stack = createNativeStackNavigator<SettingStackParamList>();
const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: 'Setting Screen',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
