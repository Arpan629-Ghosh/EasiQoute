import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import InterTightMedium from '../fontComponents/InterTightMedium';

type Props = {
  value: boolean;
  onToggle: (val: boolean) => void;
};

const CustomToggle = ({ value, onToggle }: Props) => {
  const translateX = useSharedValue(value ? 40 : 3);

  useEffect(() => {
    translateX.value = withTiming(value ? 40 : 2, { duration: 250 });
  }, [value, translateX]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, value && styles.activeContainer]}
      onPress={() => onToggle(!value)}
    >
          {
              value ? <InterTightMedium fsize={14} fcolor="#FFFFFF">
               Yes
            </InterTightMedium> : <InterTightMedium fsize={14} fcolor='#2D2D2D' textAlign='right'>No</InterTightMedium>
      }

      <Animated.View style={[styles.knob, knobStyle]} />
    </TouchableOpacity>
  );
};

export default CustomToggle;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  activeContainer: {
    backgroundColor: '#1E2A5A',
  },
  text: {
    position: 'absolute',
    left: 10,
    color: '#fff',
    fontWeight: '500',
  },
  knob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 4,
  },
});
