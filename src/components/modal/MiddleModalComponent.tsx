import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

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

  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.sheet}>{children}</View>
      </View>
    </Modal>
  );
};

export default MiddleModalComponent;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
      position: 'absolute',
      backgroundColor: theme.background,
      borderRadius: 15,
      left: 16,
      right: 16,
      // alignItems: "center"
    },
  });
