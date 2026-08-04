
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SummuryScreen from './tabs/summuryScreen/SummuryScreen'
import ItemsScreen from './tabs/itemsScreen/ItemsScreen'
import SectionsScreen from './tabs/sectionsScreen/SectionsScreen'
import PreviewScreen from './tabs/previewScreen/PreviewScreen'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars'
import { NewQuoteTopTabParamList, RootScreenProps } from '@/types/navigation.types'

const Tab = createMaterialTopTabNavigator<NewQuoteTopTabParamList>();
const NewQuoteScreens = ({ route }: RootScreenProps<'NewQuoteScreens'>) => {
  
  const quoteDetails = route.params?.quoteDetails
  const quoteId = quoteDetails?.id

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBars {...props} headerText="New Quote" />}
      
    >
          <Tab.Screen name='Summury' component={SummuryScreen} initialParams={{quoteDetails}}/>
          <Tab.Screen name='Items' component={ItemsScreen} initialParams={{quoteDetails}}/>
          <Tab.Screen name='Sections' component={SectionsScreen} initialParams={{quoteDetails}}/>
          <Tab.Screen name='Preview' component={PreviewScreen} initialParams={{quoteId}}/>
    </Tab.Navigator>
  )
}

export default NewQuoteScreens