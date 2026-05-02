import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { forwardRef, useMemo } from 'react';
import { fontFamily } from '@constants/fontFamily';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  inputWidth?: number;
  bg?: string
}

const Input = forwardRef<TextInput, Props>(
  ({ containerStyle, inputWidth, bg, style, ...rest }, ref) => {
    const { theme } = useAppTheme();
     const styles = useMemo(() => createStyles(theme), [theme]);
    return (
      <View style={[styles.container, containerStyle, {backgroundColor: bg}]}>
      {/*<View style={{backgroundColor: bg, ...styles.container ,...containerStyle}}>*/}
        <TextInput
          {...rest}
          ref={ref}
          style={[styles.input, style, {width: inputWidth, backgroundColor: bg}]}
          placeholderTextColor={theme.placeholder}
        />
      </View>
    );
  },
);

export default React.memo(Input);



const createStyles = (theme : Theme) =>  StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontFamily: fontFamily.INTER_TIGHT.regular,
    height: 48,
    width: '100%',
    borderRadius: 12,
    borderWidth: 0.5,
    paddingHorizontal: 12,
    borderColor: theme.border,
  },
});
