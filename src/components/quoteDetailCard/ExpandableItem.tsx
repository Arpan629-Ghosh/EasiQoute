import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import InterTightRegular from '../fontComponents/InterTightRegular';
import { icons } from '@/config/icons';
import ButtonComponent from '../buttonComponent/ButtonComponent';


interface ExpandableItemProp{
    title: string;
    children: React.ReactNode
}
const ExpandableItem: React.FC<ExpandableItemProp> = ({ title, children }) => {
    const [open, setOpen] = useState(false);
  return (
    <View>
      <ButtonComponent
        style={styles.expandableitem}
        onPress={() => setOpen(!open)}
      >
        <InterTightRegular fsize={14} fcolor="#2D2D2D">
          {title}
        </InterTightRegular>
        {open ? (
         
            <Image source={icons.ic_close} style={styles.img1} />
      
        ) : (
       
            <Image source={icons.ic_open} style={styles.img2} />
  
        )}
      </ButtonComponent>
      {open && children}
    </View>
  );
}

export default ExpandableItem

const styles = StyleSheet.create({
    expandableitem: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    img1: {
        height: 17,
        width: 17,
  
    },
    img2: {
        height: 24,
        width: 24,
  
    }
   
})