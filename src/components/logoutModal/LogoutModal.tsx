import { StyleSheet, View } from 'react-native';
import React from 'react';
import InterTightSemiBold from '../fontComponents/InterTightSemiBold';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import MiddleModalComponent from '../modal/MiddleModalComponent';

interface Props {
  visible: boolean;
  onClose: () => void;
}
const LogoutModal = ({ visible, onClose }: Props) => {
  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <InterTightSemiBold fsize={20} fcolor="#1D1E1D" textAlign="center">
        Are you sure you want to{'           '} Logout?
      </InterTightSemiBold>
      <View style={styles.buttonContainer}>
        <ButtonComponent bg="#082B60" bttnTxt="Logout" txtColor="#FFFFFF" />
        <ButtonComponent
          onPress={onClose}
          bttnTxt="Cancel"
          txtColor="#D23949"
        />
      </View>
    </MiddleModalComponent>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,

    width: '100%',
  },
});
