import React from 'react';
import { StyleSheet } from 'react-native';

import ColorPicker, {

  HueSlider,
  Panel1,
} from 'reanimated-color-picker';
import BottomModalComponent from '../modal/BottomModalComponent';

import { runOnJS } from 'react-native-worklets';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
};

const ColorPickerSheet = ({ visible, onClose, onSelect }: Props) => {


  return (
    <BottomModalComponent visible={visible} onClose={onClose} mheight={350} mpadding={16}>
      <ColorPicker
        onComplete={color => {
          'worklet';
          runOnJS(onSelect)(color.hex);
        }}
      >
        <Panel1 style={styles.panel} />
        <HueSlider style={styles.slider} />

     
      </ColorPicker>
    </BottomModalComponent>
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

  
  
});
