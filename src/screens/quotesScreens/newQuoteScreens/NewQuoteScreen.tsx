
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SummuryScreen from './tabs/summuryScreen/SummuryScreen'
import ItemsScreen from './tabs/itemsScreen/ItemsScreen'
import SectionsScreen from './tabs/sectionsScreen/SectionsScreen'
import PreviewScreen from './tabs/previewScreen/PreviewScreen'
import CustomTabBars from '@/components/customTopTabBar/CustomTopTabBars'
import { NewQuoteTopTabParamList } from '@/types/navigation.types'

const Tab = createMaterialTopTabNavigator<NewQuoteTopTabParamList>();
const NewQuoteScreens = () => {
  return (
      <Tab.Navigator tabBar={(props) => <CustomTabBars {...props} />}>
          <Tab.Screen name='Summury' component={SummuryScreen} />
          <Tab.Screen name='Items' component={ItemsScreen} />
          <Tab.Screen name='Sections' component={SectionsScreen} />
          <Tab.Screen name='Preview' component={PreviewScreen}/>
    </Tab.Navigator>
  )
}

export default NewQuoteScreens