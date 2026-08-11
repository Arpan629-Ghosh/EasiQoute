import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import Card from '../cardDetailsComponent/Card';
import InterTightMedium from '../appFonts/InterTightMedium';
import InterTightRegular from '../appFonts/InterTightRegular';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {  SectionsPayload } from '@/types/apis/quote.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';
import { useNavigation } from '@react-navigation/native';

interface Props {
  item: SectionsPayload;
  isSelected: boolean;
  onToggle: () => void;
}

const RenderSectionTabData = ({ item, isSelected, onToggle }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToEditSection = () => {
    navigation.navigate('NewSectionScreen', {
      editId: item.id,
      content: item.content,
      title: item.title,
      sort: Number(item.sort),
    });
  };
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.txtView}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            {item.title}
          </InterTightMedium>
          <View style={styles.nested}>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
              Order:{' '}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
              {item.sort}
            </InterTightRegular>
          </View>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={navigateToEditSection}>
            <Image source={icons.ic_edit} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.checkbox}>
            <BouncyCheckbox
              size={24}
              fillColor="#082B60"
              isChecked={isSelected}
              useBuiltInState={false}
              onPress={onToggle}
            />
          </View>
        </View>
      </View>
      <View style={styles.empty} />
      <InterTightRegular fsize={14} fcolor={theme.textSecondary}>
        {item.content}
      </InterTightRegular>
    </Card>
  );
};

export default RenderSectionTabData;

const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    gap: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
  },
  txtView: {
    flex: 1,
    gap: 5,
    paddingRight: 12
  },
  nested: {
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row',
    alignItems: "center",
    transform:  [{translateX: 14}]
  },
  icon: {
    height: 24,
    width: 24,
  },
  empty: {
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  checkbox: {
    marginLeft: 12,
    right: 0
  }
});
