import { Image } from 'react-native';
import React from 'react';
import { icons } from '@/config/icons';

interface SettingIconProps {
  focused: boolean;
  color: string;
  size: number;
}
const PaymentIcon: React.FC<SettingIconProps> = ({ focused, color, size }) => {
  const iconsource = focused ? icons.ic_boldpayment : icons.ic_paymenttab;
  return (
    <Image
      source={iconsource}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

export default PaymentIcon;
