import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '../../constants/colors';
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

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}
      <View style={[
        styles.inputContainer,
        {
          borderColor: error ? colors.error : colors.border,
          backgroundColor: colors.backgroundSecondary,
        },
      ]}>
        <TextInput
          style={[styles.textInput, { color: colors.text }, inputStyle]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder ?? '0'}
          placeholderTextColor={colors.textTertiary}
          keyboardType={keyboardType}
          returnKeyType="done"
          selectTextOnFocus
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
    minHeight: 56,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.semibold,
    padding: 0,
    textAlign: 'center',
  },
  error: {
    fontSize: FontSizes.sm,
    marginTop: Spacing.xs,
  },
});
