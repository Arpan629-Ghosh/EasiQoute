import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '@/screens/mainTabScreens/settingScreens/mainSettingScreen/SettingScreen';

const Stack = createNativeStackNavigator();
const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
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
