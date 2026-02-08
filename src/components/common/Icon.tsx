import React from 'react';
import { 
  MaterialIcons, 
  MaterialCommunityIcons, 
  Ionicons, 
  FontAwesome5,
  Feather 
} from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '../../constants/colors';

export type IconFamily = 'MaterialIcons' | 'MaterialCommunityIcons' | 'Ionicons' | 'FontAwesome5' | 'Feather';

interface IconProps {
  family: IconFamily;
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  family, 
  name, 
  size = 24, 
  color, 
  style 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const iconColor = color || colors.text;

  const IconComponent = {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5,
    Feather,
  }[family];

  return (
    <IconComponent 
      name={name as any} 
      size={size} 
      color={iconColor} 
      style={style}
    />
  );
};

// Predefined category icons for better consistency
export const CategoryIcons = {
  length: { family: 'MaterialCommunityIcons' as IconFamily, name: 'ruler' },
  weight: { family: 'MaterialCommunityIcons' as IconFamily, name: 'scale-balance' },
  temperature: { family: 'MaterialCommunityIcons' as IconFamily, name: 'thermometer' },
  area: { family: 'MaterialCommunityIcons' as IconFamily, name: 'vector-square' },
  volume: { family: 'MaterialCommunityIcons' as IconFamily, name: 'cube-outline' },
};

export const UIIcons = {
  chevronDown: { family: 'Ionicons' as IconFamily, name: 'chevron-down' },
  chevronUp: { family: 'Ionicons' as IconFamily, name: 'chevron-up' },
  close: { family: 'Ionicons' as IconFamily, name: 'close' },
  checkmark: { family: 'Ionicons' as IconFamily, name: 'checkmark' },
  back: { family: 'Ionicons' as IconFamily, name: 'arrow-back' },
  swap: { family: 'MaterialCommunityIcons' as IconFamily, name: 'swap-vertical' },
  copy: { family: 'Ionicons' as IconFamily, name: 'copy-outline' },
  share: { family: 'Ionicons' as IconFamily, name: 'share-outline' },
};