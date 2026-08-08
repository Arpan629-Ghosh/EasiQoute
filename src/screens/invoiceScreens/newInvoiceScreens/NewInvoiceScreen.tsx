import React, { useState } from 'react';
import {
  NewInvoiceTopTabParamList,
  RootScreenProps,
} from '@/types/navigation.types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SummuryScreen from '../tabs/summuryScreen/SummuryScreen';
import ItemsScreen from '../tabs/itemsScreen/ItemsScreen';
import PreviewScreen from '../tabs/previewScreen/PreviewScreen';
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars';

const Tab = createMaterialTopTabNavigator<NewInvoiceTopTabParamList>();

const NewInvoiceScreen = ({ route }: RootScreenProps<'NewInvoiceScreens'>) => {
  const invoiceDetails = route.params?.invoiceDetails;
  const quoteId = route.params?.quoteId;
  const initialInvoiceId = invoiceDetails?.id;

  const [invoiceId, setInvoiceId] = useState<number | undefined>(
    initialInvoiceId,
  );

  const canAccessItems = !!invoiceId;
  const invoiceItems = invoiceDetails?.items;
  const previewUrl = invoiceDetails?.url;

  return (
    <Tab.Navigator
      tabBar={props => (
        <CustomTabBars
          {...props}
          headerText="New Invoice"
          canAccessTabs={canAccessItems}
        />
      )}
    >
      {/* Summary */}
      <Tab.Screen name="Summury" initialParams={{ invoiceDetails, quoteId }}>
        {props => <SummuryScreen {...props} onInvoiceCreated={setInvoiceId} />}
      </Tab.Screen>

      {/* Items */}
      <Tab.Screen
        name="Items"
        component={ItemsScreen}
        initialParams={{
          invoiceId: initialInvoiceId,
          invoiceItems,
        }}
        listeners={{
          tabPress: e => {
            if (!canAccessItems) {
              e.preventDefault();
            }
          },
        }}
      />

      {/* Preview */}
      <Tab.Screen
        name="Preview"
        component={PreviewScreen}
        initialParams={{
          previewUrl,
        }}
        listeners={{
          tabPress: e => {
            if (!canAccessItems) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default NewInvoiceScreen;
