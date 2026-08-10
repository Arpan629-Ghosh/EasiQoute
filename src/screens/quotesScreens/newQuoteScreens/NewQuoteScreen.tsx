import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SummuryScreen from './tabs/summuryScreen/SummuryScreen';
import ItemsScreen from './tabs/itemsScreen/ItemsScreen';
import SectionsScreen from './tabs/sectionsScreen/SectionsScreen';
import PreviewScreen from './tabs/previewScreen/PreviewScreen';
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars';
import {
  NewQuoteTopTabParamList,
  RootScreenProps,
} from '@/types/navigation.types';
import { useState } from 'react';

const Tab = createMaterialTopTabNavigator<NewQuoteTopTabParamList>();
const NewQuoteScreens = ({ route }: RootScreenProps<'NewQuoteScreens'>) => {
  const quoteDetails = route.params?.quoteDetails;
  const initialQuoteId = quoteDetails?.id;

  const [quoteId, setQuoteId] = useState<number | undefined>(initialQuoteId);

  const canAccessItems = !!quoteId;

  return (
    <Tab.Navigator
      tabBar={props => (
        <CustomTabBars
          {...props}
          headerText="New Quote"
          canAccessTabs={canAccessItems}
        />
      )}

      screenOptions={{
        swipeEnabled: canAccessItems
      }}
    >
      <Tab.Screen name="Summury" initialParams={{quoteDetails}}>
        {props => (
          <SummuryScreen
            {...props}
            onQuoteCreated={setQuoteId}
            
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Items"
        component={ItemsScreen}
        initialParams={{ quoteDetails }}
        listeners={{
          tabPress: e => {
            if (!canAccessItems) {
              e.preventDefault();
            }
          },
        }}
      />

      <Tab.Screen
        name="Sections"
        component={SectionsScreen}
        initialParams={{ quoteDetails }}
        listeners={{
          tabPress: e => {
            if (!canAccessItems) {
              e.preventDefault();
            }
          },
        }}
      />

      <Tab.Screen
        name="Preview"
        component={PreviewScreen}
        initialParams={{ quoteId }}
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

export default NewQuoteScreens;
