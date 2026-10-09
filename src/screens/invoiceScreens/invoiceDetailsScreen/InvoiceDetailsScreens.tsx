import React from 'react';
import {
  InvoiceDetailsTopTabParamList,
  RootScreenProps,
} from '@/types/navigation.types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InvoiceTopTabBars from '@/components/customTopTabBar/InvoiceTopTabBars';
import SummuryScreen from './tabs/summuryScreen/SummuryScreen';
import DescriptionsScreen from './tabs/descriptionsScreen/DescriptionsScreen';
import PaymentScreen from './tabs/paymentScreen/PaymentScreen';
import { useInvoiceDetails } from '@/hooks/apis/invoice/useInvoiceDetails';

const Tab = createMaterialTopTabNavigator<InvoiceDetailsTopTabParamList>();
const InvoiceDetailsScreens = ({ route }: RootScreenProps<'InvoiceDetailsScreens'>) => {
  const invoiceId = route.params?.invoiceId;
  
  const { invoiceDetails} = useInvoiceDetails(invoiceId);

  return (
    <Tab.Navigator
      tabBar={props => <InvoiceTopTabBars {...props} invoiceDetails={invoiceDetails} invoiceTitle={invoiceDetails?.title} clientName={invoiceDetails?.client.name} />}
    >
      <Tab.Screen
        name="Summury"
        component={SummuryScreen}
        initialParams={{ invoiceId }}
      />
      <Tab.Screen name="Description" component={DescriptionsScreen} initialParams={{invoiceId}}/>
      <Tab.Screen name="Payments" component={PaymentScreen} />
    </Tab.Navigator>
  );
};

export default InvoiceDetailsScreens;
