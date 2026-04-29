import { Image } from 'react-native';
import React from 'react';
import { icons } from '@/config/icons';

interface InvoiceIconProps {
    focused: boolean;
  color: string;
  size: number;
}
const InvoiceIcon: React.FC<InvoiceIconProps> = ({ focused, color, size }) => {
    const iconsource = focused ? icons.ic_boldinvoice : icons.ic_invoices
  
  return (
    <Image
      source={iconsource}
      style={{ width: size, height: size, tintColor:  color }}
    />
  );
};

export default InvoiceIcon;
