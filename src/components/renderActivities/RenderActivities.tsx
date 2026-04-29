import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Activities } from '@/config/activities';
import InterTightMedium from '../fontComponents/InterTightMedium';
import InterTightRegular from '../fontComponents/InterTightRegular';

const RenderActivities = ({ item }: { item: Activities }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.txtContainer}>
            <InterTightMedium fsize={16} fcolor="#2D2D2D">
              {item.title}
            </InterTightMedium>
            <InterTightRegular fsize={14} fcolor="#89909D">
              {item.company}
            </InterTightRegular>
          </View>

          <View style={[styles.status, {backgroundColor: item.viewColor}]}>
            <InterTightMedium fsize={12} fcolor={item.textcolor}>
              {item.paymentStatus}
            </InterTightMedium>
          </View>
        </View>

        <View style={styles.empty} />

        <View style={styles.footer}>
          <View style={styles.footerTxt}>
            <InterTightRegular fsize={14} fcolor="#89909D">
              {item.type}
            </InterTightRegular>
            <InterTightRegular fsize={14} fcolor="#2D2D2D">
              {item.typeValue}
            </InterTightRegular>
          </View>

          <InterTightRegular fsize={14} fcolor="#2D2D2D">
            {item.price}
          </InterTightRegular>
        </View>
      </View>
    </View>
  );
};

export default RenderActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    gap: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtContainer: {
    height: '100%',
    gap: 5,
  },
  status: {
    height: 21,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    gap: 10,
    backgroundColor: '#F0535312',
    alignItems: 'center',
  },
  empty: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#E4E6F4',
  },
  footer: {
    height: 17,
    width: '100%',
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerTxt: {
    flexDirection: 'row',
  },
});
