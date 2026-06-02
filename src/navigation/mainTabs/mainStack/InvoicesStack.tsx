import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { InvoiceStackParamList } from '@/types/navigation.types'
import InvoiceScreen from '@/screens/bottomTabScreens/invoiceScreen/InvoiceScreen'


const Stack = createNativeStackNavigator<InvoiceStackParamList>()
const InvoicesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="InvoiceScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
    </Stack.Navigator>
  );
}

export default InvoicesStack