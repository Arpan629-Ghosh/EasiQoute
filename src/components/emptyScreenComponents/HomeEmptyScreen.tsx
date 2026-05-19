import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { images } from '@/config/images';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { useAppTheme } from '@/hooks/useAppTheme';
import InterTightRegular from '../fontComponents/InterTightRegular';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import { icons } from '@/config/icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation.types';
import {  NativeStackNavigationProp } from 'node_modules/@react-navigation/native-stack/lib/typescript/src/types';

const HomeEmptyScreen = () => {
    const { theme } = useAppTheme();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.components}>
        <Image source={images.img_homeEmpty} style={styles.img} />
        <View style={styles.txtView}>
          <InterTightMedium fsize={16} fcolor={theme.textPrimary}>
            No Recent Activity
          </InterTightMedium>
          <View>
            <InterTightRegular
              fsize={14}
              fcolor={theme.textSecondary}
              textAlign="center"
            >
              Start with creating quotes and
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor={theme.textSecondary} textAlign='center'>
                invoices to show here
            </InterTightRegular>
          </View>

          <ButtonComponent
            bg={theme.primary}
            bttnTxt="New Quote"
            txtColor={theme.primaryText}
                      gap={8}
                      onPress={() => navigation.navigate("NewQuoteScreens")}
          >
            <Image source={icons.ic_whiteadd} style={styles.icn} />
          </ButtonComponent>
        </View>
      </View>
    </View>
  );
};

export default HomeEmptyScreen;

const styles = StyleSheet.create({
    container: {
      marginTop: 80,
        gap: 8,
      alignItems: "center"
  },
  components: {
      gap: 16,
      alignItems: "center"
  },
  img: {
    height: 48,
    width: 48,
  },
  txtView: {
      gap: 6,
      alignItems: "center"
  },
  icn: {
    height: 12,
    width: 12,
  },
});
