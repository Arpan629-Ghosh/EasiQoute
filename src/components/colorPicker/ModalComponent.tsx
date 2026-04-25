import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';




type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalComponent = ({ visible, onClose, children }: Props) => {

  return (
    <Modal transparent visible={visible} animationType="slide">
     
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

     
      <View style={[styles.sheet]}>
        {children}
      </View>
    </Modal>
  );
};

export default React.memo(ModalComponent);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 350,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  
});
