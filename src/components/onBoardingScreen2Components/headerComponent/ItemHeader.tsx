import { StyleSheet, View } from 'react-native'
import React from 'react'
import InterTightSemiBold from '@/components/fontComponents/InterTightSemiBold';

const ItemHeader = () => {
  return (
    <View style={styles.container}>
      <InterTightSemiBold fsize={24} fcolor="#2D2D2D" textAlign="center">
        Everything You Need to Win the Job and Get Paid.{' '}
      </InterTightSemiBold>
    </View>
  );
}

export default ItemHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});