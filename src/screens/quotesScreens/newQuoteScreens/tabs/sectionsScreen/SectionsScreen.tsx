import { FlatList, Image, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import RenderSectionTabData from '@/components/renderSectionTabData/RenderSectionTabData';
import AppButton from '@/components/appButton/AppButton';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '@/hooks/useToast';
import { QuoteSection } from '@/types/apis/quote.types';
import { QuoteTopTabWithRootProps } from '@/types/navigation.types';
import { useCreateSection } from '@/hooks/apis/quotes/useCreateSection';
import { useSectionList } from '@/hooks/apis/quotes/useSectionList';

const SectionsScreen = ({
  navigation,
  route,
}: QuoteTopTabWithRootProps<'Sections'>) => {
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const { theme } = useAppTheme();
  const { showToast } = useToast();

  const {
    createSelectedSectionMutation,
    isCreatingSelectedSection,
  } = useCreateSection();
  const { sectionList } = useSectionList();
  const insets = useSafeAreaInsets();
  const quoteId = route.params.quoteDetails?.id;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToNewSection = () => {
    navigation.navigate('NewSectionScreen');
  };

  const handleSection = async () => {
    try {
      if (!quoteId) {
        showToast('Quote ID not found', 'error');
        return;
      }

      const payload: QuoteSection = {
        quote_id: quoteId,
        sections: sectionList
          .filter(section => selectedSections.includes(section.id))
          .map(section => ({
            title: section.title,
            content: section.content,
            sort: Number(section.sort),
          })),
      };

      await createSelectedSectionMutation(payload);
      showToast('Quote sections saved successfully.');
      navigation.navigate('Preview', {
        quoteId: quoteId,
      });
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sectionList}
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
        contentContainerStyle={styles.flatlist}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footeritem}>
          <AppButton
            borderwidth={1}
            gap={8}
            borderc={theme.chipBorder}
            bttnTxt="New Section"
            txtColor={theme.textMuted}
            buttonWidth="48.5%"
            onPress={navigateToNewSection}
          >
            <Image source={icons.ic_addicon} style={styles.addicon} />
          </AppButton>
          <AppButton
            bg={theme.primary}
            buttonWidth="48.5%"
            bttnTxt="Save & Preview"
            txtColor={theme.primaryText}
            showLoader={isCreatingSelectedSection}
            onPress={handleSection}
          />
        </View>
      </View>
    </View>
  );
};

export default SectionsScreen;
