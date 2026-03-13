import { responsiveFontSize, responsiveSpacing } from './responsive';

export const Colors = {
  light: {
    // Primary colors
    primary: "#6366F1", // Modern indigo
    primaryLight: "#A5B4FC",
    primaryDark: "#4338CA",
    
    // Secondary colors
    secondary: "#EC4899", // Modern pink
    secondaryLight: "#F9A8D4",
    secondaryDark: "#BE185D",
    
    // Background colors
    background: "#FFFFFF",
    backgroundSecondary: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceSecondary: "#F1F5F9",
    
    // Text colors
    text: "#0F172A",
    textSecondary: "#64748B",
    textTertiary: "#94A3B8",
    
    // Border colors
    border: "#E2E8F0",
    borderSecondary: "#CBD5E1",
    
    // Status colors
    error: "#EF4444",
    errorLight: "#FEE2E2",
    success: "#10B981",
    successLight: "#D1FAE5",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    info: "#3B82F6",
    infoLight: "#DBEAFE",
    
    // Category colors
    length: "#8B5CF6",
    weight: "#06B6D4",
    temperature: "#F59E0B",
    area: "#10B981",
    volume: "#EC4899",
    
    // Interactive colors
    accent: "#F97316",
    highlight: "#FEF3C7",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    // Primary colors
    primary: "#818CF8",
    primaryLight: "#C7D2FE",
    primaryDark: "#6366F1",
    
    // Secondary colors
    secondary: "#F472B6",
    secondaryLight: "#FBCFE8",
    secondaryDark: "#EC4899",
    
    // Background colors
    background: "#0F172A",
    backgroundSecondary: "#1E293B",
    surface: "#1E293B",
    surfaceSecondary: "#334155",
    
    // Text colors
    text: "#F8FAFC",
    textSecondary: "#CBD5E1",
    textTertiary: "#94A3B8",
    
    // Border colors
    border: "#334155",
    borderSecondary: "#475569",
    
    // Status colors
    error: "#F87171",
    errorLight: "#7F1D1D",
    success: "#34D399",
    successLight: "#064E3B",
    warning: "#FBBF24",
    warningLight: "#78350F",
    info: "#60A5FA",
    infoLight: "#1E3A8A",
    
    // Category colors
    length: "#A78BFA",
    weight: "#22D3EE",
    temperature: "#FBBF24",
    area: "#34D399",
    volume: "#F472B6",
    
    // Interactive colors
    accent: "#FB923C",
    highlight: "#78350F",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};

export const Spacing = {
  xs: responsiveSpacing(4),
  sm: responsiveSpacing(8),
  md: responsiveSpacing(16),
  lg: responsiveSpacing(24),
  xl: responsiveSpacing(32),
  xxl: responsiveSpacing(48),
  xxxl: responsiveSpacing(64),
};

export const BorderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

export const FontSizes = {
  xs: responsiveFontSize(12),
  sm: responsiveFontSize(14),
  md: responsiveFontSize(16),
  lg: responsiveFontSize(18),
  xl: responsiveFontSize(20),
  xxl: responsiveFontSize(24),
  xxxl: responsiveFontSize(32),
  xxxxl: responsiveFontSize(40),
};

export const FontWeights = {
  light: "300" as const,
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

export const Shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export const Animations = {
  timing: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  },
};

// Helper function to get category color
export const getCategoryColor = (category: string, colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme];
  switch (category) {
    case 'length': return colors.length;
    case 'weight': return colors.weight;
    case 'temperature': return colors.temperature;
    case 'area': return colors.area;
    case 'volume': return colors.volume;
    default: return colors.primary;
  }
};
