import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from "../../constants/colors";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 48,
    };

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: FontSizes.md,
      fontWeight: "500" as const,
      textAlign: "center",
    };

    switch (variant) {
      case "primary":
      case "secondary":
        return {
          ...baseStyle,
          color: "#FFFFFF",
        };
      case "outline":
        return {
          ...baseStyle,
          color: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
