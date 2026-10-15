import { Image } from 'react-native'
import React from 'react'
import { icons } from '@/config/icons'


interface QouteIconProps {
    focused: boolean,
    color: string;
    size: number
}
const QouteIcon: React.FC<QouteIconProps> = ({focused, color, size }) => {
    const iconsource = focused ? icons.ic_boldqoute : icons.ic_qoute
  return (
    <Image
      source={iconsource}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

export default QouteIcon;

