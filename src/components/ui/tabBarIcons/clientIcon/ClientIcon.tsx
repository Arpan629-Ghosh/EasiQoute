import { Image } from 'react-native';
import React from 'react';
import { icons } from '@/config/icons';

interface ClientIconProps {
    focused: boolean,
  color: string;
  size: number;
}
const ClientIcon: React.FC<ClientIconProps> = ({ focused, color, size }) => {
    const iconsource = focused ? icons.ic_boldclient : icons.ic_clients
  return (
    <Image
      source={iconsource}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

export default ClientIcon;