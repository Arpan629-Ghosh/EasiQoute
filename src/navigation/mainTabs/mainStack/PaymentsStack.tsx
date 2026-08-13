import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaymentStackParamList } from '@/types/navigation.types';
import PaymentsScreen from '@/screens/bottomTabScreens/paymentsScreen/PaymentsScreen';

const Stack = createNativeStackNavigator<PaymentStackParamList>();
const PaymentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PaymentsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PaymentsScreen"
        component={PaymentsScreen}
        options={{
          title: 'Payment Screen',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PaymentsStack;
