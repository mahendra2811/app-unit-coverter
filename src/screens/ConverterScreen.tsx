import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { AppInput } from '../components/common/AppInput';
import { AppDropdown } from '../components/common/AppDropdown';
import { AppCard } from '../components/common/AppCard';
import { getCategoryById } from '../constants/units';
import { convert, formatResult } from '../utils/converters';
import { Colors, Spacing, FontSizes } from '../constants/colors';
import { UnitCategory } from '../types/unit.types';

type ConverterScreenRouteProp = RouteProp<{
  Converter: {
    categoryId: UnitCategory;
    categoryName: string;
  };
}, 'Converter'>;

export default function ConverterScreen() {
  const route = useRoute<ConverterScreenRouteProp>();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const { categoryId, categoryName } = route.params;
  const category = getCategoryById(categoryId);
  
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(category?.units[0]?.id || '');
  const [toUnit, setToUnit] = useState(category?.units[1]?.id || category?.units[0]?.id || '');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: `${categoryName} Converter`,
    });
  }, [navigation, categoryName]);

  useEffect(() => {
    if (inputValue && category) {
      try {
        const numValue = parseFloat(inputValue);
        if (!isNaN(numValue)) {
          const convertedValue = convert(numValue, fromUnit, toUnit, categoryId);
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

  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>Category not found</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const unitOptions = category.units.map(unit => ({
    label: `${unit.name} (${unit.symbol})`,
    value: unit.id,
  }));

  const selectedToUnit = category.units.find(unit => unit.id === toUnit);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <AppInput
            label="Enter Value"
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
            placeholder="0"
            style={styles.input}
          />
          
          <View style={styles.unitsContainer}>
            <View style={styles.unitSelector}>
              <AppDropdown
                label="From"
                items={unitOptions}
                selectedValue={fromUnit}
                onValueChange={setFromUnit}
              />
            </View>
            
            <View style={styles.unitSelector}>
              <AppDropdown
                label="To"
                items={unitOptions}
                selectedValue={toUnit}
                onValueChange={setToUnit}
              />
            </View>
          </View>
          
          <AppCard variant="elevated" style={styles.resultCard}>
            <View style={styles.resultContainer}>
              <ThemedText style={[styles.resultLabel, { color: colors.textSecondary }]}>
                Result
              </ThemedText>
              
              {error ? (
                <View style={styles.errorResultContainer}>
                  <ThemedText style={[styles.errorText, { color: colors.error }]}>
                    {error}
                  </ThemedText>
                </View>
              ) : (
                <View style={styles.successResultContainer}>
                  <ThemedText style={styles.resultValue}>
                    {result || '0'}
                  </ThemedText>
                  <ThemedText style={[styles.resultUnit, { color: colors.textSecondary }]}>
                    {selectedToUnit?.symbol || ''}
                  </ThemedText>
                </View>
              )}
            </View>
          </AppCard>

          {inputValue && !error && result && (
            <AppCard style={styles.conversionCard}>
              <View style={styles.conversionSummary}>
                <ThemedText style={[styles.conversionText, { color: colors.textSecondary }]}>
                  {inputValue} {category.units.find(u => u.id === fromUnit)?.symbol} = {result} {selectedToUnit?.symbol}
                </ThemedText>
              </View>
            </AppCard>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  input: {
    marginBottom: Spacing.md,
  },
  unitsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  unitSelector: {
    flex: 1,
  },
  resultCard: {
    marginTop: Spacing.md,
  },
  resultContainer: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  resultLabel: {
    fontSize: FontSizes.md,
    marginBottom: Spacing.md,
  },
  successResultContainer: {
    alignItems: 'center',
  },
  resultValue: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  resultUnit: {
    fontSize: FontSizes.lg,
    fontWeight: '500',
  },
  errorResultContainer: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  errorText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  conversionCard: {
    marginTop: Spacing.md,
  },
  conversionSummary: {
    alignItems: 'center',
    padding: Spacing.md,
  },
  conversionText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
});