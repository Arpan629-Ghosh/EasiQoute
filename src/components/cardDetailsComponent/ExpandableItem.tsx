import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InterTightRegular from '../appFonts/InterTightRegular';
import { icons } from '@/config/icons';
import { useAppTheme } from '@/hooks/useAppTheme';


interface ExpandableItemProp{
    title: string;
    children: React.ReactNode
}
const ExpandableItem: React.FC<ExpandableItemProp> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const { theme , isDark} = useAppTheme();
  return (
    <View>
      <TouchableOpacity
        style={styles.expandableitem}
        onPress={() => setOpen(!open)}
      >
        <InterTightRegular fsize={14} fcolor={theme.textPrimary}>
          {title}
        </InterTightRegular>
        {open ? (
          <Image
            source={isDark ? icons.ic_darkopen : icons.ic_close}
            style={styles.img1}
          />
        ) : (
          <Image
            source={isDark ? icons.ic_darkdown : icons.ic_open}
            style={styles.img2}
          />
        )}
      </TouchableOpacity>
      {open && children}
    </View>
  );
}

export default React.memo(ExpandableItem)

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