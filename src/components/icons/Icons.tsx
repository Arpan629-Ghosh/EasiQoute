import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import InterTightLight from '../fontComponents/InterTightLight';
import { icons } from '@/config/icons';

interface Prop {
  text: string;
  children?: React.ReactNode;
}
const Icons: React.FC<Prop> = ({ text, children }) => {
  return (
    <View style={styles.newqoute}>
      <View style={styles.commonicon}>
        <View style={styles.comonsize}>{children}</View>

        <View style={styles.comonsize}>
          <View style={styles.comonsize}>
            <Image source={icons.ic_vector} style={styles.vector} />
          </View>
        </View>
      </View>
      <InterTightLight fsize={12} fcolor="#FFFFFF">
        {text}
      </InterTightLight>
    </View>
  );
};

export default Icons;

const styles = StyleSheet.create({
  newqoute: {
    height: 63,
    borderRadius: 8,
    padding: 8,
    gap: 8,
    width: 109,
  },
  commonicon: {
    flexDirection: 'row',
    height: 24,
    width: 93,
    justifyContent: 'space-between',
    borderRadius: 7,
  },
  comonsize: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vector: {
    height: 14,
    width: 13.6,
    resizeMode: 'cover',
  },
});
