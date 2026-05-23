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
  bg?: string;
  inputHeight?: number;
  tv?: TextStyle['textAlignVertical'];
}

const Input = forwardRef<TextInput, Props>(
  ({ containerStyle, inputWidth, bg, tv,  style, inputHeight=48, ...rest }, ref) => {
    const { theme } = useAppTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    return (
      <View style={[styles.container, containerStyle, { backgroundColor: bg }]}>
     
        <TextInput
          {...rest}
          ref={ref}
          style={[
            styles.input,
            style,
            { width: inputWidth, backgroundColor: bg, height: inputHeight, textAlignVertical: tv ,color: theme.textPrimary},
          ]}
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
    width: '100%',
    borderRadius: 12,
    // textAlignVertical: "top",
    borderWidth: 0.5,
    paddingHorizontal: 12,
    borderColor: theme.border,
  },
});
