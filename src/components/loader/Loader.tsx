import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import React from 'react'

type Props = {
    visible: boolean
}
const Loader = ({visible} : Props) => {
  return (
      <Modal visible={visible} animationType='fade'>
          <View style={styles.overlay} />
          
          <View style = {styles.loader}>
              <ActivityIndicator color="#FFFFFF" size="large"/>
          </View>
   </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  loader: {
    position: 'absolute',
    // backgroundColor: 'rgba(0,0,0,0.4)',
    // borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    gap: 24,
    bottom: '40%',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
});