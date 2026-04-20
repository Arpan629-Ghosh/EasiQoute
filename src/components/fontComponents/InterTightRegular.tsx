import React from 'react';
import { Text, TextProps } from 'react-native';
import { fontFamily } from '../../constants/fontFamily';

interface Props extends TextProps {
  fcolor: string;
  fsize: 12 | 14 | 16 | 18 | 20;
}

const InterTightRegular: React.FC<Props> = ({
  fcolor = '#2c2c2c',
  fsize = 12,
  children,
  ...rest
}) => {

  return (
    <Text
      {...rest}
      style={{
        fontFamily: fontFamily.INTER_TIGHT.regular,
        color: fcolor,
        fontSize: fsize,
      }}
    >
      {children}
    </Text>
  );
};

export default InterTightRegular;
