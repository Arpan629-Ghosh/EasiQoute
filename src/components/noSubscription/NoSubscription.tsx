import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import MiddleModalComponent from '../modal/MiddleModalComponent'
import { images } from '@/config/images';
import InterTightSemiBold from '../fontComponents/InterTightSemiBold';
import InterTightRegular from '../fontComponents/InterTightRegular';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import InterTightMedium from '../fontComponents/InterTightMedium';

type Props = {
  visible: boolean;
  onClose: () => void;
};
const NoSubscription = ({ visible, onClose }: Props) => {
  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <Image source={images.img_subscription} style={styles.img} />
      <View style={styles.txtView}>
        <InterTightSemiBold fsize={20} fcolor="#1D1E1D" textAlign="center">
          Subscription Required
        </InterTightSemiBold>
        <InterTightRegular fsize={14} fcolor="#89909D" textAlign='center'>
          To continue using EaziQuote, please activate or renew your
          subscription.
        </InterTightRegular>
      </View>
      <View style={styles.bttnView}>
        <ButtonComponent style={styles.bttn1}>
          <InterTightMedium fsize={16} fcolor="#FFFFFF">
            Activate Subscription
          </InterTightMedium>
        </ButtonComponent>
        <ButtonComponent onPress={onClose} style= {styles.bttn2}>
          <InterTightMedium fsize={16} fcolor="#D23949">
            Not Now
          </InterTightMedium>
        </ButtonComponent>
      </View>
    </MiddleModalComponent>
  );
};

export default React.memo(NoSubscription)

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 80,
  },
  txtView: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bttnView: {
    width: "100%",
  },
  bttn1: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    backgroundColor: '#082B60',
    alignItems: 'center',
  },
  bttn2: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    alignItems: 'center',
  },
});