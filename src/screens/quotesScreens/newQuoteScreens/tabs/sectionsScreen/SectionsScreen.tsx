import { FlatList, Image, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import RenderSectionTabData from '@/components/renderSectionTabData/RenderSectionTabData'
import ButtonComponent from '@/components/buttonComponent/ButtonComponent'
import { icons } from '@/config/icons'
import { useAppTheme } from '@/hooks/useAppTheme'
import {createStyles} from './style'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SectionsScreenProps } from '@/types/navigation.types'
import { useQuotes } from '@/hooks/apis/useQuotes'

const SectionsScreen = ({navigation}: SectionsScreenProps) => {
  const { theme } = useAppTheme();
  const { getSections, sections, isFetchCall } = useQuotes();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme])

  const navigateToNewSection = () => {
    navigation.navigate("NewSectionScreen");
  }

  useEffect(() => {
    getSections();
  }, [getSections, isFetchCall])
  
  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        renderItem={({ item }) => <RenderSectionTabData item={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
      />
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <View style={styles.footeritem}>
          <ButtonComponent
            borderwidth={1}
            gap={8}
            borderc={theme.chipBorder}
            bttnTxt="New Section"
            txtColor={theme.textMuted}
            buttonWidth={169.5}
            onPress={navigateToNewSection}
          >
            <Image source={icons.ic_addicon} style={styles.addicon} />
          </ButtonComponent>
          <ButtonComponent
            bg={theme.primary}
            buttonWidth={169.5}
            bttnTxt="Save & Preview"
            txtColor={theme.primaryText}
          />
   
        </View>
      </View>
    </View>
  );
}

export default SectionsScreen