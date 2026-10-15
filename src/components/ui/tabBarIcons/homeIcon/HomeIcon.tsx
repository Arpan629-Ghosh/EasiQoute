import { Image } from 'react-native';
import React from 'react';
import { icons } from '@/config/icons';

interface HomeIconProps {
    focused: boolean,
  color: string;
  size: number;
}
const HomeIcon: React.FC<HomeIconProps> = ({ focused, color, size }) => {
    const iconsource = focused ? icons.ic_boldhome : icons.ic_home
  return (
    <Image
      source={iconsource}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

export default HomeIcon;
