import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

type Props = {
  visible: boolean;

  onClose: () => void;
  children: React.ReactNode;
};
const MiddleModalComponent = ({
  visible,

  onClose,
  children,
}: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>{children}</View>
    </Modal>
  );
};

export default MiddleModalComponent;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    gap: 24,
    bottom: 256,
    left: 16,
      right: 16,
    alignItems: "center"
  },
});
