import React from 'react';
import { Text, TextProps } from 'react-native';
import { fontFamily } from '@constants/fontFamily';

interface Props extends TextProps {
  fcolor: string;
  fsize: 12 | 14 | 16 | 18 | 20 | 22 | 24;
  textAlign?: string;
}

const InterTightSemiBold: React.FC<Props> = ({
  fcolor = '#2c2c2c',
  fsize = 12,
  textAlign = "",
  children,
  ...rest
}) => {

  return (
    <Text
      {...rest}
      style={{
        fontFamily: fontFamily.INTER_TIGHT.semibold,
        color: fcolor,
        fontSize: fsize,
        textAlign: textAlign
      }}
    >
      {children}
    </Text>
  );
};

export default InterTightSemiBold;
