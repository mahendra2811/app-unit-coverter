import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Device type detection
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

export const isSmallDevice = () => SCREEN_WIDTH < 375;
export const isMediumDevice = () => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = () => SCREEN_WIDTH >= 414;

// Responsive dimensions
export const wp = (percentage: number) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

export const hp = (percentage: number) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font sizes
export const responsiveFontSize = (size: number) => {
  const scale = SCREEN_WIDTH / 375; // Base on iPhone X width
  const newSize = size * scale;
  
  if (isTablet()) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize * 1.2));
  }
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Responsive spacing
export const responsiveSpacing = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

// Screen dimensions
export const SCREEN_DIMENSIONS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet: isTablet(),
  isSmall: isSmallDevice(),
  isMedium: isMediumDevice(),
  isLarge: isLargeDevice(),
};

// Responsive breakpoints
export const BREAKPOINTS = {
  small: 375,
  medium: 414,
  large: 768,
  xlarge: 1024,
};

// Grid system
export const getGridColumns = () => {
  if (isTablet()) return 3;
  if (isLargeDevice()) return 2;
  return 2;
};

export const getCardWidth = () => {
  const columns = getGridColumns();
  const padding = responsiveSpacing(16);
  const gap = responsiveSpacing(8);
  
  return (SCREEN_WIDTH - (padding * 2) - (gap * (columns - 1))) / columns;
};