import React from 'react'
import { NewInvoiceTopTabParamList, RootScreenProps } from '@/types/navigation.types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars';
import SummuryScreen from '../tabs/summuryScreen/SummuryScreen';
import ItemsScreen from '../tabs/itemsScreen/ItemsScreen';
import PreviewScreen from '../tabs/previewScreen/PreviewScreen';





const Tab = createMaterialTopTabNavigator<NewInvoiceTopTabParamList>();

const NewInvoiceScreen = ({ route }: RootScreenProps<'NewInvoiceScreens'>) => {

  const invoiceDetails = route.params?.invoiceDetails;
  const quoteId = route.params?.quoteId
 

   
    return (
 
        <Tab.Navigator
          tabBar={props => (
            <CustomTabBars {...props} headerText="New Invoice" />
          )}
        >
          <Tab.Screen
            name="Summury"
            component={SummuryScreen}
            initialParams={{ invoiceDetails , quoteId }}
          />
          <Tab.Screen
            name="Items"
            component={ItemsScreen}
            // initialParams={{ invoiceId, previewUrl }}
          />
          <Tab.Screen
            name="Preview"
            component={PreviewScreen}
            // initialParams={{ previewUrl }}
          />
        </Tab.Navigator>
  
    );
}

export default NewInvoiceScreen