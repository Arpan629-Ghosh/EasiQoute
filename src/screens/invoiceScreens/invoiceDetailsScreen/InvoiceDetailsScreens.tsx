import React, { useEffect } from 'react';
import {
  InvoiceDetailsTopTabParamList,
  RootScreenProps,
} from '@/types/navigation.types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import InvoiceTopTabBars from '@/components/customTopTabBar/InvoiceTopTabBars';
import SummuryScreen from '../invoiceDetailsTabs/summuryScreen/SummuryScreen';
import DescriptionsScreen from '../invoiceDetailsTabs/descriptionsScreen/DescriptionsScreen';
import PaymentScreen from '../invoiceDetailsTabs/paymentScreen/PaymentScreen';
import { useInvoice } from '@/hooks/apis/useInvoice';

const Tab = createMaterialTopTabNavigator<InvoiceDetailsTopTabParamList>();
const InvoiceDetailsScreens = ({ route }: RootScreenProps<'InvoiceDetailsScreens'>) => {
  const invoiceId = route.params?.invoiceId;
  const { getInvoiceDetails, invoiceDetails } = useInvoice();


  useEffect(() => {
    getInvoiceDetails(invoiceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId])

  return (
    <Tab.Navigator
      tabBar={props => <InvoiceTopTabBars {...props} invoiceDetails={invoiceDetails} invoiceTitle={invoiceDetails?.title} clientName={invoiceDetails?.client.name} />}
    >
      <Tab.Screen
        name="Summury"
        component={SummuryScreen}
        initialParams={{ invoiceId }}
      />
      <Tab.Screen name="Description" component={DescriptionsScreen}/>
      <Tab.Screen name="Payments" component={PaymentScreen} />
    </Tab.Navigator>
  );
};

export default InvoiceDetailsScreens;
