import React from 'react'
import { NewInvoiceScreensProps, NewInvoiceTopTabParamList } from '@/types/navigation.types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars';
import SummuryScreen from '../tabs/summuryScreen/SummuryScreen';
import ItemsScreen from '../tabs/itemsScreen/ItemsScreen';
import PreviewScreen from '../tabs/previewScreen/PreviewScreen';


const Tab = createMaterialTopTabNavigator<NewInvoiceTopTabParamList>();
const NewInvoiceScreen = ({ route }: NewInvoiceScreensProps) => {
    
   
    return (
     
        <Tab.Navigator tabBar={props => <CustomTabBars {...props} headerText="New Invoice"/>}>
          <Tab.Screen name="Summury" component={SummuryScreen} />
          <Tab.Screen name="Items" component={ItemsScreen} />
          <Tab.Screen name="Preview" component={PreviewScreen} />
        </Tab.Navigator>
     
    );
}

export default NewInvoiceScreen