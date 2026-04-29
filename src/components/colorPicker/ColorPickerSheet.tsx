import React from 'react';
import { StyleSheet } from 'react-native';

import ColorPicker, {

  HueSlider,
  Panel1,
} from 'reanimated-color-picker';
import ModalComponent from '../modal/ModalComponent';

import { runOnJS } from 'react-native-worklets';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
};

const ColorPickerSheet = ({ visible, onClose, onSelect }: Props) => {


  return (
    <ModalComponent visible={visible} onClose={onClose} mheight={350} mpadding={16}>
      <ColorPicker
        onComplete={color => {
          'worklet';
          runOnJS(onSelect)(color.hex);
        }}
      >
        <Panel1 style={styles.panel} />
        <HueSlider style={styles.slider} />

     
      </ColorPicker>
    </ModalComponent>
  );
};

export default React.memo(ColorPickerSheet);

const styles = StyleSheet.create({
  panel: {
    height: 200,
    borderRadius: 12,
  },
  slider: {
    marginTop: 20,
  },
  view: {
    marginTop: 20,
    gap: 20,
    flexDirection: 'row',
  },

  bttn2: {
    height: 46,
    width: 175,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    backgroundColor: '#082B60',
    borderColor: '#E4E6F4',
    alignItems: 'center',
  },
  
});
