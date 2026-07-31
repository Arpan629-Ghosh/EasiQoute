
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SummuryScreen from './tabs/summuryScreen/SummuryScreen'
import ItemsScreen from './tabs/itemsScreen/ItemsScreen'
import SectionsScreen from './tabs/sectionsScreen/SectionsScreen'
import PreviewScreen from './tabs/previewScreen/PreviewScreen'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars'
import { NewQuoteTopTabParamList, RootScreenProps } from '@/types/navigation.types'

const Tab = createMaterialTopTabNavigator<NewQuoteTopTabParamList>();
const NewQuoteScreens = ({ route }: RootScreenProps<'NewQuoteScreens'>) => {
  
  const quoteId = route.params?.quoteId
  const previewUrl = route.params?.previewUrl

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBars {...props} headerText="New Quote" />}
      
    >
          <Tab.Screen name='Summury' component={SummuryScreen} initialParams={{quoteId}}/>
          <Tab.Screen name='Items' component={ItemsScreen} initialParams={{quoteId}}/>
          <Tab.Screen name='Sections' component={SectionsScreen} initialParams={{quoteId}}/>
          <Tab.Screen name='Preview' component={PreviewScreen} initialParams={{quoteId, previewUrl}}/>
    </Tab.Navigator>
  )
}

export default NewQuoteScreens