import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { CreateCategoriesPayload } from '@/types/apis/settings.types'
import Card from '../cardDetailsComponent/Card'
import CardHeader from '../cardDetailsComponent/CardHeader'
import { icons } from '@/config/icons'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Theme } from '@/types/theme.types'
import InterTightRegular from '../fontComponents/InterTightRegular'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation.types'

const RenderCategories = ({ item }: { item: CreateCategoriesPayload }) => {
    const { theme } = useAppTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const styles = useMemo(() => createStyles(theme), [theme])

    const navigateToEdit = () => {
        navigation.navigate('NewCategoryScreen', {
          editId: item.id,
          name: item.name
        })
    }
    
  return (
    <Card style={styles.card}>
      <CardHeader title={item.name}>
        <TouchableOpacity onPress={navigateToEdit}>
          <Image source={icons.ic_edit} style={styles.edit} />
        </TouchableOpacity>
      </CardHeader>
      <View style={styles.border} />
      <View style={styles.cardFooter}>
        <View style={styles.txt}>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            Subcategories:
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {item.subcategories_count}
          </InterTightRegular>
        </View>
        <View style={styles.txt}>
          <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
            Items:
          </InterTightRegular>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            {item.items_count}
          </InterTightRegular>
        </View>
      </View>
    </Card>
  );
}

export default RenderCategories

const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
        gap: 16,
      marginBottom: 8
  },
  edit: {
    height: 24,
    width: 24,
  },
    border: {
        borderWidth: 0.5,
        borderColor: theme.border
    },
    cardFooter: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "space-between"
    },
    txt: {
        flexDirection: "row"
    }
});