import React, { createContext, useState } from 'react'
import { NewInvoiceTopTabParamList, RootScreenProps } from '@/types/navigation.types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars';
import SummuryScreen, { NewInvoiceProp } from '../tabs/summuryScreen/SummuryScreen';
import ItemsScreen from '../tabs/itemsScreen/ItemsScreen';
import PreviewScreen from '../tabs/previewScreen/PreviewScreen';
import { useInvoice } from '@/hooks/apis/useInvoice';


interface InitialContextProp {
  summary: NewInvoiceProp;
  setSummary: React.Dispatch<React.SetStateAction<NewInvoiceProp>>
}
const initialValue: NewInvoiceProp = {
  quoteId: undefined,
  invoice_date: '',
  due_date: '',
  message: '',
  notes: '',
  file: [],
};

export const InvoiceContext = createContext<InitialContextProp | undefined>(undefined);

const Tab = createMaterialTopTabNavigator<NewInvoiceTopTabParamList>();

const NewInvoiceScreen = ({ route }: RootScreenProps<'NewInvoiceScreens'>) => {

  const [summary, setSummary] = useState<NewInvoiceProp>(initialValue)
  const quoteId = route.params?.quoteId
  const invoiceId = route.params?.invoiceId
  const { invoiceDetails } = useInvoice();
   const previewUrl = invoiceDetails?.url

   
    return (
      <InvoiceContext.Provider value={{ summary, setSummary }}>
        <Tab.Navigator
          tabBar={props => (
            <CustomTabBars {...props} headerText="New Invoice" />
          )}
        >
          <Tab.Screen
            name="Summury"
            component={SummuryScreen}
            initialParams={{ quoteId, invoiceId }}
          />
          <Tab.Screen
            name="Items"
            component={ItemsScreen}
            initialParams={{ invoiceId, previewUrl }}
          />
          <Tab.Screen
            name="Preview"
            component={PreviewScreen}
            initialParams={{ previewUrl }}
          />
        </Tab.Navigator>
      </InvoiceContext.Provider>
    );
}

export default NewInvoiceScreen