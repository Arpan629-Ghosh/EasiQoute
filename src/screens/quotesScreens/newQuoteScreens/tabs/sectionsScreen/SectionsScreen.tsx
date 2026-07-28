import { FlatList, Image, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import RenderSectionTabData from '@/components/renderSectionTabData/RenderSectionTabData'
import ButtonComponent from '@/components/buttonComponent/ButtonComponent'
import { icons } from '@/config/icons'
import { useAppTheme } from '@/hooks/useAppTheme'
import {createStyles} from './style'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuotes } from '@/hooks/apis/useQuotes'
import { useToast } from '@/hooks/useToast'
import { QuoteSection } from '@/types/apis/quote.types'
import { QuoteTopTabWithRootProps } from '@/types/navigation.types'

const SectionsScreen = ({ navigation, route }: QuoteTopTabWithRootProps<'Sections'>) => {
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const { theme } = useAppTheme();
  const { showToast } = useToast();
  const {
    getSections,
    createSelectedSections,
    sections,
    isFetchCall,
    loadingSections,
  } = useQuotes();
  const insets = useSafeAreaInsets();
  const quoteId = route.params.quoteId;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToNewSection = () => {
    navigation.navigate('NewSectionScreen');
  };

  useEffect(() => {
    getSections();
  }, [getSections, isFetchCall]);

  const handleSection = async () => {
    try {
      if (!quoteId) {
        showToast('Quote ID not found', 'error');
        return;
      }

      const payload: QuoteSection = {
        quote_id: quoteId,
        sections: sections
          .filter(section => selectedSections.includes(section.id))
          .map(section => ({
            title: section.title,
            content: section.content,
            sort: Number(section.sort),
          })),
      };

      await createSelectedSections(payload);
      showToast('Quote sections saved successfully.');
    } catch (error) {
      showToast(String(error), 'error');
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <RenderSectionTabData
            item={item}
            isSelected={selectedSections.includes(item.id)}
            onToggle={() => {
              setSelectedSections(prev =>
                prev.includes(item.id)
                  ? prev.filter(id => id !== item.id)
                  : [...prev, item.id],
              );
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
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
            showLoader={loadingSections}
            onPress={handleSection}
          />
        </View>
      </View>
    </View>
  );
};

export default SectionsScreen