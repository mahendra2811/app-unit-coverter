import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ExpoClipboard from 'expo-clipboard';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { AppInput } from '../src/components/common/AppInput';
import { AppDropdown } from '../src/components/common/AppDropdown';
import { AppCard } from '../src/components/common/AppCard';
import { Icon, UIIcons } from '../src/components/common/Icon';
import { getCategoryById } from '../src/constants/units';
import { convert, formatResult } from '../src/utils/converters';
import {
  Colors,
  Spacing,
  FontSizes,
  FontWeights,
  BorderRadius,
  Shadows,
  getCategoryColor
} from '../src/constants/colors';
import { responsiveSpacing, isSmallDevice } from '../src/constants/responsive';
import { UnitCategory } from '../src/types/unit.types';
import { Stack, useLocalSearchParams } from 'expo-router';

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
  const [copied, setCopied] = useState(false);

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
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = async () => {
    if (result) {
      await ExpoClipboard.setStringAsync(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!category) {
    return (
      <>
        <Stack.Screen options={{ title: 'Error' }} />
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <Icon family="MaterialCommunityIcons" name="alert-circle-outline" size={48} color={colors.error} />
            <ThemedText style={[styles.errorText, { color: colors.error }]}>
              Category not found
            </ThemedText>
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
  const small = isSmallDevice();

  return (
    <>
      <Stack.Screen
        options={{
          title: `${categoryName} Converter`,
          headerStyle: { backgroundColor: categoryColor },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: FontWeights.semibold, fontSize: FontSizes.lg },
        }}
      />
      <StatusBar barStyle="light-content" backgroundColor={categoryColor} />

      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Compact color band */}
            <View style={[
              styles.colorBand,
              { backgroundColor: categoryColor },
              small && styles.colorBandSmall,
            ]}>
              <Icon
                family={category.icon.family}
                name={category.icon.name}
                size={responsiveSpacing(26)}
                color="rgba(255,255,255,0.9)"
              />
              <ThemedText style={styles.bandText}>
                {category.description}
              </ThemedText>
            </View>

            <View style={styles.content}>
              {/* Input */}
              <AppInput
                label="Enter Value"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="decimal-pad"
                placeholder="0"
              />

              {/* Unit selectors + swap */}
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
                  style={[styles.swapButton, { backgroundColor: categoryColor }, Shadows.sm]}
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

              {/* Result card */}
              <AppCard
                variant="elevated"
                style={[styles.resultCard, { borderColor: categoryColor + '40' }]}
              >
                <View style={styles.resultHeader}>
                  <ThemedText style={[styles.resultLabel, { color: colors.textSecondary }]}>
                    Result
                  </ThemedText>
                  {result && !error && (
                    <TouchableOpacity
                      onPress={handleCopy}
                      style={styles.copyButton}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Icon
                        family={copied ? 'MaterialCommunityIcons' : UIIcons.copy.family}
                        name={copied ? 'check' : UIIcons.copy.name}
                        size={18}
                        color={copied ? colors.success : colors.textSecondary}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {error ? (
                  <View style={styles.errorRow}>
                    <Icon family="MaterialCommunityIcons" name="alert-circle" size={20} color={colors.error} />
                    <ThemedText style={[styles.errorText, { color: colors.error }]}>
                      {error}
                    </ThemedText>
                  </View>
                ) : (
                  <View style={styles.resultValueRow}>
                    <ThemedText
                      style={[styles.resultValue, { color: colors.text }]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.5}
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
              </AppCard>

              {/* Conversion summary badge */}
              {inputValue && !error && result && (
                <View style={[
                  styles.summaryBadge,
                  { backgroundColor: categoryColor + '12', borderColor: categoryColor + '30' },
                ]}>
                  <ThemedText style={[styles.summaryText, { color: colors.text }]}>
                    <ThemedText style={{ fontWeight: FontWeights.semibold }}>
                      {inputValue} {selectedFromUnit?.symbol}
                    </ThemedText>
                    <ThemedText style={{ color: colors.textSecondary }}>{' = '}</ThemedText>
                    <ThemedText style={{ fontWeight: FontWeights.semibold, color: categoryColor }}>
                      {result} {selectedToUnit?.symbol}
                    </ThemedText>
                  </ThemedText>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  colorBand: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  colorBandSmall: {
    paddingVertical: Spacing.sm,
  },
  bandText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  unitsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  unitSelector: {
    flex: 1,
  },
  swapButton: {
    width: responsiveSpacing(44),
    height: responsiveSpacing(44),
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  resultCard: {
    borderWidth: 1.5,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  copyButton: {
    padding: Spacing.xs,
  },
  resultValueRow: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
  },
  resultValue: {
    fontSize: FontSizes.xxxxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  resultUnit: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  errorText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.xl,
  },
  summaryBadge: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: FontSizes.md * 1.5,
  },
});
