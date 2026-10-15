import { Image } from 'react-native'
import React from 'react'
import { icons } from '@/config/icons'


interface SettingIconProps {
    focused: boolean,
    color: string;
    size: number
}
const SettingIcon: React.FC<SettingIconProps> = ({ focused, color, size }) => {
    const iconsource = focused ? icons.ic_boldsetting : icons.ic_settings
  return (
    <Image
      source={iconsource}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

export default SettingIcon;
