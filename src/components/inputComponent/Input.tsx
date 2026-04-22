import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { forwardRef } from 'react';
import { fontFamily } from '@constants/fontFamily';

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

const Input = forwardRef<TextInput, Props>(
  ({ containerStyle, style, ...rest }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...rest}
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor="#ABABAB"
        />
      </View>
    );
  },
);

export default React.memo(Input);



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    fontFamily: fontFamily.INTER_TIGHT.regular,
    height: 48,
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 12,
    borderColor: '#E4E6F4',
  },
});
