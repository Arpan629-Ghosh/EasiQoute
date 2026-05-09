import { FlatList, Image, View } from 'react-native'
import React, { useMemo } from 'react'
import { DATA } from '@/config/SectionData'
import RenderSectionTabData from '@/components/renderSectionTabData/RenderSectionTabData'
import ButtonComponent from '@/components/buttonComponent/ButtonComponent'
import { icons } from '@/config/icons'
import { useAppTheme } from '@/hooks/useAppTheme'
import {createStyles} from './style'

const SectionsScreen = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <RenderSectionTabData item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
      />
      <View style={styles.footer}>
        <View style={styles.footeritem}>
          <ButtonComponent
            borderwidth={1}
            gap={8}
            borderc={theme.chipBorder}
            bttnTxt="New Section"
            txtColor={theme.textMuted}
            buttonWidth={169.5}
        
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