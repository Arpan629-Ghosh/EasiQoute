import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import React from 'react';
import InterTightMedium from '../appFonts/InterTightMedium';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightRegular from '../appFonts/InterTightRegular';
import AppButton from '../appButton/AppButton';
import { icons } from '@/config/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation.types';

interface Props {
  icon: ImageSourcePropType;
  primaryText: string;
    message: string;
    nextMessage?: string
  butttonEnabled?: boolean;
}
const EmptyStateScreen = ({
  icon,
  primaryText,
    message,
    nextMessage,
  butttonEnabled=false,
}: Props) => {
  const { theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.img} />
      <View style={styles.txtContainer}>
        <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
          {primaryText}
        </InterTightMedium>
        <View>
          <InterTightRegular
            fsize={14}
            fcolor={theme.textSecondary}
            textAlign="center"
          >
            {message}
          </InterTightRegular>
          <InterTightRegular
            fsize={14}
            fcolor={theme.textSecondary}
            textAlign="center"
          >
            {nextMessage}
          </InterTightRegular>
        </View>
      </View>
      {butttonEnabled && (
        <AppButton
          bg={theme.primary}
          bttnTxt="New Quote"
          txtColor={theme.primaryText}
          gap={8}
          onPress={() => navigation.navigate('NewQuoteScreens')}
        >
          <Image source={icons.ic_whiteadd} style={styles.icn} />
        </AppButton>
      )}
    </View>
  );
};

export default EmptyStateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
      
  },
  img: {
    height: 48,
    width: 48,
  },
  txtContainer: {
      gap: 6,
      alignItems: 'center'
  },
  icn: {
    height: 12,
    width: 12,
  },
});
