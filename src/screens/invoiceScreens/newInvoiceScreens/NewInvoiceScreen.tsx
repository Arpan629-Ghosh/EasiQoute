import React from 'react'
import { NewInvoiceTopTabParamList, RootScreenProps } from '@/types/navigation.types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars';
import SummuryScreen from '../tabs/summuryScreen/SummuryScreen';
import ItemsScreen from '../tabs/itemsScreen/ItemsScreen';
import PreviewScreen from '../tabs/previewScreen/PreviewScreen';
import { useInvoice } from '@/hooks/apis/useInvoice';


const Tab = createMaterialTopTabNavigator<NewInvoiceTopTabParamList>();
const NewInvoiceScreen = ({ route }: RootScreenProps<'NewInvoiceScreens'>) => {
  const quoteId = route.params?.quoteId
  const invoiceId = route.params?.invoiceId
  const { invoiceDetails } = useInvoice();
   const previewUrl = invoiceDetails?.url

   
    return (
     
        <Tab.Navigator tabBar={props => <CustomTabBars {...props} headerText="New Invoice"/>}>
          <Tab.Screen name="Summury" component={SummuryScreen} initialParams={{quoteId, invoiceId}}/>
          <Tab.Screen name="Items" component={ItemsScreen} initialParams={{invoiceId}} />
          <Tab.Screen name="Preview" component={PreviewScreen} initialParams={{previewUrl}} />
        </Tab.Navigator>
     
    );
}

export default NewInvoiceScreen