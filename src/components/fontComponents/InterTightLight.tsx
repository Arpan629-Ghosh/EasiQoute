import React from 'react';
import { Text, TextProps } from 'react-native';
import { fontFamily } from '@constants/fontFamily';

interface Props extends TextProps {
  fcolor: string;
  fsize: 10 | 12 | 14 | 16 | 18 | 20;
  textAlign?: string;
}

const InterTightLight: React.FC<Props> = ({
  fcolor = '#2c2c2c',
  fsize = 12,
  children,
  textAlign = '',
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={{
        fontFamily: fontFamily.INTER_TIGHT.light,
        color: fcolor,
        fontSize: fsize,
        textAlign: textAlign,
      }}
    >
      {children}
    </Text>
  );
};

export default InterTightLight;
