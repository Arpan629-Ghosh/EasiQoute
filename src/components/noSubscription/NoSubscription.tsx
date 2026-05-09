import { Image, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import MiddleModalComponent from '../modal/MiddleModalComponent'
import { images } from '@/config/images';
import InterTightSemiBold from '../fontComponents/InterTightSemiBold';
import InterTightRegular from '../fontComponents/InterTightRegular';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';

type Props = {
  visible: boolean;
  onClose: () => void;
};
const NoSubscription = ({ visible, onClose }: Props) => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <Image source={images.img_subscription} style={styles.img} />
      <View style={styles.txtView}>
        <InterTightSemiBold
          fsize={20}
          fcolor={theme.textPrimary}
          textAlign="center"
        >
          Subscription Required
        </InterTightSemiBold>
        <InterTightRegular
          fsize={14}
          fcolor={theme.textSecondary}
          textAlign="center"
        >
          To continue using EaziQuote, please activate or renew your
          subscription.
        </InterTightRegular>
      </View>
      <View style={styles.bttnView}>
        <ButtonComponent
          bg={theme.primary}
          bttnTxt="Activate Subscription"
          txtColor={theme.primaryText}
      
        />
       
        <ButtonComponent
          onPress={onClose}
          bttnTxt="Not Now"
          txtColor="#D23949"
        />
        
        
      </View>
    </MiddleModalComponent>
  );
};

export default React.memo(NoSubscription)

const createStyles = (theme:Theme) =>  StyleSheet.create({
  img: {
    height: 80,
    width: 80,
  },
  txtView: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bttnView: {
    width: '100%',
  },
  bttn1: {
    width: '100%',
    height: 46,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    backgroundColor: theme.primary,
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