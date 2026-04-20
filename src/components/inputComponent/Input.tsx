import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';
import React, { forwardRef } from 'react';
import { fontFamily } from '../../constants/fontFamily';

interface Props extends TextInputProps { 
  style?: StyleProp<TextStyle>; 
}

const Input = forwardRef<TextInput, Props>(
  ({ style, ...rest }, ref) => {
    return (
      <View style={[styles.container]}>
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

export default Input;



const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontFamily: fontFamily.INTER_TIGHT.regular,
    height: 48,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: '#E4E6F4',
  },
});
