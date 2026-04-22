import React from 'react';
import { Text, TextProps } from 'react-native';
import { fontFamily } from '@constants/fontFamily';

interface Props extends TextProps {
  fcolor: string;
  fsize: 12 | 14 | 16 | 18 | 20;
}

const InterTightMedium: React.FC<Props> = ({
  fcolor = '#2c2c2c',
  fsize = 12,
  children,
  ...rest
}) => {

  return (
    <Text
      {...rest}
      style={{
        fontFamily: fontFamily.INTER_TIGHT.medium,
        color: fcolor,
        fontSize: fsize,
      }}
    >
      {children}
    </Text>
  );
};

export default InterTightMedium;
