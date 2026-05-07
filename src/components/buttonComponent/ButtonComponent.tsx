import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import InterTightMedium from '../fontComponents/InterTightMedium';


interface Props extends TouchableOpacityProps {
  bg?: string;
  borderc?: string;
  gap?: number;
  borderwidth?: number;
  buttonWidth?: number; 
  txtColor: string;
  bttnTxt: string;
 

}
const ButtonComponent: React.FC<Props> = ({

  bg,
  borderc,
  gap,
  borderwidth,
  txtColor,
  bttnTxt,
  children,
  buttonWidth,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.bttn,
        {
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
    </TouchableOpacity>
  );
};


export default React.memo(ButtonComponent);

const styles = StyleSheet.create({
  bttn: {

    flexDirection: 'row',
    height: 46,
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center"
  },
});
