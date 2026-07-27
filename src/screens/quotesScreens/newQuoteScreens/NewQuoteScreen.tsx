
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SummuryScreen from './tabs/summuryScreen/SummuryScreen'
import ItemsScreen from './tabs/itemsScreen/ItemsScreen'
import SectionsScreen from './tabs/sectionsScreen/SectionsScreen'
import PreviewScreen from './tabs/previewScreen/PreviewScreen'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars'
import { NewQuoteScreensProps, NewQuoteTopTabParamList } from '@/types/navigation.types'

const Tab = createMaterialTopTabNavigator<NewQuoteTopTabParamList>();
const NewQuoteScreens = ({ route }: NewQuoteScreensProps) => {
  
  const quoteId = route.params?.quoteId

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBars {...props} headerText="New Quote" />}
      
    >
          <Tab.Screen name='Summury' component={SummuryScreen} initialParams={{quoteId}}/>
          <Tab.Screen name='Items' component={ItemsScreen} initialParams={{quoteId}}/>
          <Tab.Screen name='Sections' component={SectionsScreen} initialParams={{quoteId}}/>
          <Tab.Screen name='Preview' component={PreviewScreen} initialParams={{quoteId}}/>
    </Tab.Navigator>
  )
}

export default NewQuoteScreens