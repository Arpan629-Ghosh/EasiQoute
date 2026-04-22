import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native'


interface Props extends TouchableOpacityProps {
    style?: StyleProp<TextStyle>
}
const ButtonComponent: React.FC<Props> = ({style, children,  ...rest}) => {
  return (
    <TouchableOpacity {...rest} style={style}>
      {children}
    </TouchableOpacity>
  );
}

export default React.memo(ButtonComponent);

