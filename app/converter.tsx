import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { AppInput } from '../src/components/common/AppInput';
import { AppDropdown } from '../src/components/common/AppDropdown';
import { Icon, UIIcons } from '../src/components/common/Icon';
import { getCategoryById } from '../src/constants/units';
import { convert, formatResult } from '../src/utils/converters';
import {
  Colors,
  Spacing,
  FontSizes,
  FontWeights,
  BorderRadius,
  getCategoryColor,
} from '../src/constants/colors';
import { UnitCategory } from '../src/types/unit.types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function ConverterScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId: UnitCategory;
    categoryName: string;
  }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const category = getCategoryById(categoryId!);
  const categoryColor = getCategoryColor(categoryId!, colorScheme ?? 'light');

  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(category?.units[0]?.id || '');
  const [toUnit, setToUnit] = useState(category?.units[1]?.id || category?.units[0]?.id || '');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (inputValue && category) {
      try {
        const numValue = parseFloat(inputValue);
        if (!isNaN(numValue)) {
          const convertedValue = convert(numValue, fromUnit, toUnit, categoryId!);
          setResult(formatResult(convertedValue));
          setError('');
        } else {
          setResult('');
          setError('');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Conversion error');
        setResult('');
      }
    } else {
      setResult('');
      setError('');
    }
  }, [inputValue, fromUnit, toUnit, categoryId, category]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  if (!category) {
    return (
      <>
        <Stack.Screen options={{ title: 'Error' }} />
        <SafeAreaView
          style={[styles.container, { backgroundColor: colors.background }]}
          edges={['bottom', 'left', 'right']}
        >
          <View style={styles.center}>
            <ThemedText style={{ color: colors.error }}>Category not found</ThemedText>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const unitOptions = category.units.map(unit => ({
    label: `${unit.name} (${unit.symbol})`,
    value: unit.id,
  }));

  const selectedFromUnit = category.units.find(u => u.id === fromUnit);
  const selectedToUnit = category.units.find(u => u.id === toUnit);

  return (
    <>
      <Stack.Screen
        options={{
          title: categoryName as string,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: FontWeights.semibold, fontSize: FontSizes.lg },
        }}
      />
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
        edges={['bottom', 'left', 'right']}
      >
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.inner, isTablet && styles.innerTablet]}>
              {/* Input */}
              <AppInput
                label="Value"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="decimal-pad"
                placeholder="0"
              />

              {/* From / Swap / To */}
              <View style={styles.unitsRow}>
                <View style={styles.unitSelector}>
                  <AppDropdown
                    label="From"
                    items={unitOptions}
                    selectedValue={fromUnit}
                    onValueChange={setFromUnit}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.swapButton, { backgroundColor: categoryColor }]}
                  onPress={handleSwapUnits}
                  activeOpacity={0.8}
                >
                  <Icon
                    family={UIIcons.swap.family}
                    name={UIIcons.swap.name}
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                <View style={styles.unitSelector}>
                  <AppDropdown
                    label="To"
                    items={unitOptions}
                    selectedValue={toUnit}
                    onValueChange={setToUnit}
                  />
                </View>
              </View>

              {/* Result */}
              <View
                style={[
                  styles.resultBox,
                  { backgroundColor: colors.surface, borderColor: categoryColor + '50' },
                ]}
              >
                <ThemedText style={[styles.resultLabel, { color: colors.textSecondary }]}>
                  Result
                </ThemedText>

                {error ? (
                  <ThemedText style={[styles.errorText, { color: colors.error }]}>
                    {error}
                  </ThemedText>
                ) : (
                  <View style={styles.resultValueRow}>
                    <ThemedText
                      style={[styles.resultValue, { color: colors.text }]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.4}
                    >
                      {result || '—'}
                    </ThemedText>
                    {result ? (
                      <ThemedText style={[styles.resultUnit, { color: categoryColor }]}>
                        {selectedToUnit?.symbol}
                      </ThemedText>
                    ) : null}
                  </View>
                )}
              </View>

              {/* Summary */}
              {inputValue && !error && result && (
                <ThemedText style={[styles.summary, { color: colors.textSecondary }]}>
                  {inputValue} {selectedFromUnit?.symbol} = {result} {selectedToUnit?.symbol}
                </ThemedText>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { flexGrow: 1 },
  inner: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  innerTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  unitsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  unitSelector: { flex: 1 },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  resultBox: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    padding: isTablet ? Spacing.xl : Spacing.lg,
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  resultLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  resultValueRow: {
    alignItems: 'center',
    paddingTop: Spacing.xs,
    gap: 2,
  },
  resultValue: {
    fontSize: isTablet ? FontSizes.xxxxl * 1.2 : FontSizes.xxxxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  resultUnit: {
    fontSize: isTablet ? FontSizes.xxl : FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  errorText: {
    fontSize: FontSizes.md,
    paddingTop: Spacing.xs,
  },
  summary: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
