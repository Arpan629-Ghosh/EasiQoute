import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const widthScale = SCREEN_WIDTH / DESIGN_WIDTH;
const heightScale = SCREEN_HEIGHT / DESIGN_HEIGHT;

export const scaleWidth = (size: number): number => {
  return size * widthScale;
};

export const scaleHeight = (size: number): number => {
  return size * heightScale;
};

export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scaleWidth(size) - size) * factor;
};

export const normalizeFont = (size: number): number => {
  const scaledSize = size + (size * widthScale - size) * 0.5;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};
