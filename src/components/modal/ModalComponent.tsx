import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';




type Props = {
  visible: boolean;
  mheight?: number;
  mpadding?: number;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalComponent = ({ visible, mheight, mpadding, onClose, children }: Props) => {
  const { theme } = useAppTheme();
   const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Modal transparent visible={visible} animationType="slide">
     
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

     
      <View style={[styles.sheet, {height: mheight, padding: mpadding}]}>
        {children}
      </View>
    </Modal>
  );
};

export default React.memo(ModalComponent);

const createStyles = (theme: Theme) => StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: theme.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
