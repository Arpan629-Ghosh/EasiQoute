import { StyleSheet, View } from 'react-native'
import React from 'react'
import InterTightMedium from '../appFonts/InterTightMedium';
import InterTightRegular from '../appFonts/InterTightRegular';


interface Prop {
    price: string;
    type: string;
    numberDueActive: string
}
const AppDetails: React.FC<Prop> = ({ price, type, numberDueActive }: Prop) => {
  
  return (
    <View style={styles.invoice}>
      <View style={styles.invoicetxt}>
        <InterTightMedium fsize={18} fcolor="#FFFFFF">
          {price}
        </InterTightMedium>
        <InterTightRegular fsize={12} fcolor="#FFFFFF">
         {type}
        </InterTightRegular>
      </View>
      <View style={styles.overdue}>
        <View style={type === "Pending Quotes" ? styles.dot2 : styles.dot1 } />
        <InterTightRegular
          fsize={12}
          fcolor={type === "Pending Quotes" ? "#0597FF" : "#F05353"}
        >
          {numberDueActive}
        </InterTightRegular>
      </View>
    </View>
  );
}

export default React.memo(AppDetails)

const styles = StyleSheet.create({
  invoice: {
    height: 70,
    width: 147.5,
    gap: 8,
    alignItems: 'center',
  },
  invoicetxt: {
    height: 41,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overdue: {
    height: 21,
    width: 84,
    borderRadius: 21,
    paddingVertical: 3,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot1: {
    height: 6,
    width: 6,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#F05353',
  },
  dot2: {
    height: 6,
    width: 6,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#0597FF',
  },
});