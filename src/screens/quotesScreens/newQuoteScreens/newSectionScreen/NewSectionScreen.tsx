import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import InterTightRegular from '@/components/appFonts/InterTightRegular';
import AppInput from '@/components/appInput/AppInput';
import { icons } from '@/config/icons';
import AppButton from '@/components/appButton/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuotes } from '@/hooks/apis/useQuotes';
import { useToast } from '@/hooks/useToast';
import { images } from '@/config/images';
import { Sections } from '@/types/apis/quote.types';
import { RootScreenProps } from '@/types/navigation.types';

interface SectionForm {
  order: string;
  sectionTitle: string;
  description: string;
}

const NewSectionScreen = ({ navigation, route }: RootScreenProps<'NewSectionScreen'>) => {
  const editId = route.params?.editId;
  const content = route.params?.content;
  const title = route.params?.title;
  const sort = route.params?.sort
  const [sectionFormData, setSectionFormData] = useState<SectionForm>({
    order: '',
    sectionTitle: title || '',
    description: content || '',
  });
  const { theme } = useAppTheme();
  const { createSections, deleteSections, loadingSections } = useQuotes();
  const { showToast } = useToast();
  const insets = useSafeAreaInsets();
  
  const isEdit = !!editId;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const updateField = (name: keyof SectionForm, txt: string) => {
    setSectionFormData(prev => ({
      ...prev,
      [name]: txt,
    }));
  };

  const handleSection = async () => {
    try {
      const payload: Sections = {
        title: sectionFormData.sectionTitle,
        content: sectionFormData.description,
        sort: Number(sectionFormData.order),
      };

      if (isEdit) {
        payload.id = editId;
        payload.sort = Number(sort);
      }

      await createSections(payload);
      showToast(
        isEdit
          ? 'Proposal document section updated successfully.'
          : 'Proposal document section saved successfully.',
      );

      setSectionFormData({
        order: '',
        sectionTitle: '',
        description: '',
      });
      navigation.goBack();
    } catch (error) {
      showToast(String(error), 'error');
    }
  };

  const handleDeleteSections = async () => {
    try {
      await deleteSections(editId as number);
      showToast('Section deleted successfully!');
      navigation.goBack();
    } catch (error) {
      showToast(String(error), 'error')
    }  
  }

  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <Header
        txt={isEdit ? 'Edit Section' : 'Add New Section'}
        borderBottomEnabled={true}
      />
      <ScrollView style={styles.scrollview} keyboardShouldPersistTaps="handled">
        <View style={styles.body}>
          {!isEdit && (
            <View style={styles.inp}>
              <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
                Order
              </InterTightRegular>
              <View style={styles.input}>
                <AppInput
                  placeholder="Enter order number"
                  style={styles.noBorderInput}
                  value={sectionFormData.order}
                  onChangeText={txt => updateField('order', txt)}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
                <Image source={icons.ic_drop} style={styles.searchic} />
              </View>
            </View>
          )}
          <View style={styles.nextinp}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Section Title
            </InterTightRegular>
            <AppInput
              placeholder="Item Name"
              value={sectionFormData.sectionTitle}
              onChangeText={txt => updateField('sectionTitle', txt)}
              keyboardType="name-phone-pad"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inp}>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              Description
            </InterTightRegular>
            <AppInput
              inputHeight={200}
              placeholder="Item Description"
              multiline={true}
              tv="top"
              value={sectionFormData.description}
              onChangeText={txt => updateField('description', txt)}
              keyboardType="name-phone-pad"
            />
          </View>
        </View>
        <View style={styles.deleteView}>
          {editId && (
            <TouchableOpacity onPress={handleDeleteSections}>
              <Image source={images.img_delete} style={styles.delete} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <AppButton
            bg={theme.primary}
            bttnTxt={isEdit ? 'Save Changes' : 'Save'}
            txtColor={theme.primaryText}
            showLoader={loadingSections}
            onPress={handleSection}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewSectionScreen;
