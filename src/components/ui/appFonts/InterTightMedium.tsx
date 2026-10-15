import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { fontFamily } from '@constants/fontFamily';

interface Props extends TextProps {
  fcolor?: string;
  fsize?: 10 | 12 | 14 | 16 | 18 | 20;
  textAlign?: TextStyle['textAlign'];
}

const InterTightMedium: React.FC<Props> = ({
  fcolor = '#2c2c2c',
  fsize = 12,
  children,
  textAlign,
  style,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fontFamily.INTER_TIGHT.medium,
          color: fcolor,
          fontSize: fsize,
          ...(textAlign ? { textAlign } : {}),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default InterTightMedium;
