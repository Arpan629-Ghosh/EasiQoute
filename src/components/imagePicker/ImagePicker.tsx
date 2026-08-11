import { StyleSheet, View } from 'react-native';
import React from 'react';
import BottomModalComponent from '../modal/BottomModalComponent';
import AppButton from '../appButton/AppButton';
import { useAppTheme } from '@/hooks/useAppTheme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {Image} from 'react-native-compressor'
interface props {
  visible: boolean;
  onClose: () => void;
  onImageUri: (uri: string) => void;
  onRemoveUri: () => void;
}
const ImagePicker = ({ visible, onClose, onImageUri, onRemoveUri }: props) => {
  const { theme } = useAppTheme();

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    console.log(result);

    if (result.didCancel) return;
    if (result.errorCode) {
      console.log(result.errorMessage);
    }

    const uri = result.assets?.[0]?.uri;
    if (uri) {
      console.log(uri);
      const compressedImg = await Image.compress(uri, {
        compressionMethod: 'auto'
      })
      console.log(compressedImg)
      onImageUri(compressedImg);
      onClose();
    }
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
    });

    if (result.didCancel) return;

    if (result.errorCode) {
      console.log(result.errorMessage);
      return;
    }

    const uri = result.assets?.[0]?.uri;
    if (uri) {
      const compressedImg = await Image.compress(uri, {
        compressionMethod: 'auto'
      })
      onImageUri(compressedImg);
      // console.log(uri);
      onClose();
    }
  };

  const removePhoto = () => {
    onRemoveUri();
    onClose();
  };
  return (
    <BottomModalComponent visible={visible} onClose={onClose} mheight={240}>
      <View style={styles.container}>
        <View style={styles.bttnContainer}>
          <AppButton
            bttnTxt="Choose from gallery"
            bg={theme.primary}
            txtColor={theme.primaryText}
            onPress={openGallery}
          />
          <AppButton
            bttnTxt="Take photo"
            bg={theme.primary}
            txtColor={theme.primaryText}
            onPress={openCamera}
          />

          <AppButton
            bttnTxt="Remove photo"
            bg={theme.primary}
            txtColor={theme.primaryText}
            onPress={removePhoto}
          />
        </View>
      </View>
    </BottomModalComponent>
  );
};

export default React.memo(ImagePicker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  bttnContainer: {
    gap: 12,
  },
});
