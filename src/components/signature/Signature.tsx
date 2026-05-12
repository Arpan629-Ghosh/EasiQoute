import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { SetStateAction, useMemo, useRef } from 'react';
import MiddleModalComponent from '../modal/MiddleModalComponent';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Theme } from '@/types/theme.types';
import InterTightMedium from '../fontComponents/InterTightMedium';
import { icons } from '@/config/icons';
import ButtonComponent from '../buttonComponent/ButtonComponent';
import SignatureView, { SignatureViewRef } from 'react-native-signature-canvas';

interface Props {
  visible: boolean;
    onClose: () => void;
    isLoading: boolean;
    handleSignature: (sign: string) => void;
    handleClear: () => void;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;

}
const Signature = ({
  visible,
  onClose,
  isLoading,
  handleClear,
  handleSignature,
  setIsLoading,
}: Props) => {
  const ref = useRef<SignatureViewRef>(null);

  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleEnd = () => {
    setIsLoading(true);
      ref.current?.readSignature();

  };
 

  return (
    <MiddleModalComponent visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <InterTightMedium fsize={18} fcolor={theme.textPrimary}>
          Add Signature
        </InterTightMedium>
        <TouchableOpacity onPress={onClose}>
          <Image source={icons.ic_crossicn} style={styles.cross} />
        </TouchableOpacity>
      </View>
      <View style={styles.signature}>
        <SignatureView
          ref={ref}
          onOK={handleSignature}
          autoClear={false}
       
          webviewProps={{
            cacheEnabled: true,
            androidLayerType: 'hardware',
          }}
        />
      </View>
      <View style={styles.bttnContainer}>
        <ButtonComponent
          buttonWidth={165.5}
          bttnTxt="Clear"
          txtColor="#D23949"
          onPress={handleClear}
        />
        <ButtonComponent
          bg={theme.primary}
          bttnTxt={isLoading ? "Saving..." : "Save"}
          buttonWidth={165.5}
          txtColor={theme.primaryText}
          onPress={handleEnd}
        />
      </View>
    </MiddleModalComponent>
  );
};

export default React.memo(Signature);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cross: {
      height: 16,
      width: 16,
    },
    signature: {
      gap: 16,

      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      height: 200,
      width: 303,
    },
    bttnContainer: {
      flexDirection: 'row',
    },
    signaturecomponet: {
      height: 200,
      width: 303,
      borderRadius: 12,
      borderWidth: 1,
      gap: 12,
      borderColor: theme.border,
      bottom: 0,
    },
  });
