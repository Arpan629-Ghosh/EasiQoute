import { Image, View } from 'react-native';
import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';
import { createStyles } from './style';
import Header from '@/components/header/Header';
import InterTightRegular from '@/components/fontComponents/InterTightRegular';
import Input from '@/components/inputComponent/Input';
import { icons } from '@/config/icons';
import ButtonComponent from '@/components/buttonComponent/ButtonComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NewSectionScreen = () => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <LinearGradient colors={theme.gradientPrimary} style={styles.container}>
      <Header txt="Add New Section" borderBottomEnabled={true} />
      <View style={styles.body}>
        <View style={styles.inp}>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            Order
          </InterTightRegular>
          <View style={styles.input}>
            <Input
              placeholder="Enter order number"
              style={styles.noBorderInput}
              // value={search}
              // onChangeText={(txt) => handleInput(txt)}
            />
            <Image source={icons.ic_drop} style={styles.searchic} />
          </View>
        </View>
        <View style={styles.nextinp}>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            Section Title
          </InterTightRegular>
          <Input placeholder="Item Name" />
        </View>
        <View style={styles.inp}>
          <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
            Description
          </InterTightRegular>
          <Input
            inputHeight={200}
            placeholder="Item Description"
            multiline={true}
            tv="top"
          />
        </View>
      </View>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContainer}>
          <ButtonComponent
            bg={theme.primary}
            bttnTxt="Save"
            txtColor={theme.primaryText}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewSectionScreen;
