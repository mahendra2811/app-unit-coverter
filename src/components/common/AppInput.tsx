import React from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardTypeOptions, ViewStyle, TextStyle } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, FontSizes } from '../../constants/colors';
import { validateNumericInput } from '../../utils/converters';

interface AppInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  autoValidate?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  keyboardType = 'numeric',
  style,
  inputStyle,
  autoValidate = true,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleTextChange = (text: string) => {
    if (autoValidate && keyboardType === 'numeric') {
      const validation = validateNumericInput(text);
      if (validation.isValid) {
        onChangeText(text);
      }
    } else {
      onChangeText(text);
    }
  };

  const inputContainerStyle = [
    styles.inputContainer,
    {
      borderColor: error ? colors.error : colors.border,
      backgroundColor: colors.background,
    },
  ];

  const textInputStyle = [
    styles.textInput,
    {
      color: colors.text,
    },
    inputStyle,
  ];

  const labelStyle = [
    styles.label,
    {
      color: colors.text,
    },
  ];

  const errorStyle = [
    styles.error,
    {
      color: colors.error,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={inputContainerStyle}>
        <TextInput
          style={textInputStyle}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 48,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: FontSizes.md,
    flex: 1,
    padding: 0,
  },
  error: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
});