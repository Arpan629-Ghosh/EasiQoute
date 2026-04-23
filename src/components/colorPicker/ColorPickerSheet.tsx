import React from 'react';
import { StyleSheet, View } from 'react-native';


import ColorPicker, { HueSlider, Panel1 } from 'reanimated-color-picker';
import ModalComponent from './ModalComponent';
import { runOnJS } from 'react-native-worklets';
import Input from '../inputComponent/Input';


type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
};

const ColorPickerSheet = ({ visible, onClose, onSelect }: Props) => {
  return (
    <ModalComponent visible={visible} onClose={onClose}>
      <ColorPicker
        style={{ width: '100%' }}
        onComplete={color => {
          'worklet';

          runOnJS(onSelect)(color.hex);
        }}
      >
        <Panel1 style={styles.panel} />
        <HueSlider style={styles.slider} />
        <View style = {styles.view}>
          <Input style={styles.inp } />
        </View>
      </ColorPicker>
    </ModalComponent>
  );
};

export default ColorPickerSheet;

const styles = StyleSheet.create({
  panel: {
    height: 200,
    borderRadius: 12,
  },
  slider: {
    marginTop: 20,
  },
  view: {
    marginTop: 20
  },
  inp: {
    width: 10,
    height: 10
  }
});
