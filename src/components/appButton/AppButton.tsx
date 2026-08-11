import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import InterTightMedium from '../appFonts/InterTightMedium';


interface Props extends TouchableOpacityProps {
  bg?: string;
  borderc?: string;
  gap?: number;
  borderwidth?: number;
  buttonWidth?: number |`${number}%`; 
  showLoader?: boolean;
  txtColor: string;
  bttnTxt: string;
  flex?: number 

}
const AppButton: React.FC<Props> = ({

  bg,
  borderc,
  gap,
  borderwidth,
  showLoader=false,
  txtColor,
  bttnTxt,
  children,
  buttonWidth,
  flex,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.bttn,
        {
          flex: flex ,
          backgroundColor: bg,
          gap: gap,
          borderColor: borderc,
          borderWidth: borderwidth,
          width: buttonWidth,
        },
      ]}
    >
      {children}
      <InterTightMedium fsize={16} fcolor={txtColor}>
        {bttnTxt}
      </InterTightMedium>
      {showLoader && <ActivityIndicator color="#FFFFFF" />}
    </TouchableOpacity>
  );
};


export default React.memo(AppButton);

const styles = StyleSheet.create({
  bttn: {

    flexDirection: 'row',
    height: 46,
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
