import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  StatusBar,
  Animated
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
import { responsiveSpacing } from '../src/constants/responsive';
import { UnitCategory } from '../src/types/unit.types';
import { Stack } from 'expo-router';

export default function ConverterScreen() {
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId: UnitCategory;
    categoryName: string;
  }>();
  const router = useRouter();
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
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  if (!category) {
    return (
      <>
        <Stack.Screen options={{ title: 'Error' }} />
        <StatusBar 
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.errorContainer}>
            <Icon
              family="MaterialCommunityIcons"
              name="alert-circle-outline"
              size={48}
              color={colors.error}
            />
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

  const selectedFromUnit = category.units.find(unit => unit.id === fromUnit);
  const selectedToUnit = category.units.find(unit => unit.id === toUnit);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: `${categoryName} Converter`,
          headerStyle: {
            backgroundColor: categoryColor,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: FontWeights.semibold,
            fontSize: FontSizes.lg,
          },
        }} 
      />
      <StatusBar 
        barStyle="light-content"
        backgroundColor={categoryColor}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={[styles.headerSection, { backgroundColor: categoryColor }]}>
            <View style={styles.headerContent}>
              <Icon
                family={category.icon.family}
                name={category.icon.name}
                size={responsiveSpacing(40)}
                color="#FFFFFF"
              />
              <ThemedText style={styles.headerTitle}>
                {category.description}
              </ThemedText>
            </View>
          </View>

          <View style={styles.content}>
            {/* Input Section */}
            <AppCard variant="elevated" style={styles.inputCard}>
              <AppInput
                label="Enter Value"
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                placeholder="0"
                style={styles.input}
              />
            </AppCard>
            
            {/* Units Selection */}
            <View style={styles.unitsSection}>
              <View style={styles.unitSelector}>
                <AppDropdown
                  label="From"
                  items={unitOptions}
                  selectedValue={fromUnit}
                  onValueChange={setFromUnit}
                />
              </View>
              
              {/* Swap Button */}
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
            
            {/* Result Section */}
            <AppCard variant="elevated" style={[styles.resultCard, { borderColor: `${categoryColor}30` }]}>
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <ThemedText style={[styles.resultLabel, { color: colors.textSecondary }]}>
                    Result
                  </ThemedText>
                  {result && !error && (
                    <TouchableOpacity style={styles.copyButton}>
                      <Icon
                        family={UIIcons.copy.family}
                        name={UIIcons.copy.name}
                        size={16}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                
                {error ? (
                  <View style={styles.errorResultContainer}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="alert-circle"
                      size={24}
                      color={colors.error}
                    />
                    <ThemedText style={[styles.errorText, { color: colors.error }]}>
                      {error}
                    </ThemedText>
                  </View>
                ) : (
                  <View style={styles.successResultContainer}>
                    <ThemedText style={[styles.resultValue, { color: colors.text }]}>
                      {result || '0'}
                    </ThemedText>
                    <ThemedText style={[styles.resultUnit, { color: categoryColor }]}>
                      {selectedToUnit?.symbol || ''}
                    </ThemedText>
                  </View>
                )}
              </View>
            </AppCard>

            {/* Conversion Summary */}
            {inputValue && !error && result && (
              <AppCard style={[styles.summaryCard, { backgroundColor: `${categoryColor}10` }]}>
                <View style={styles.summaryContent}>
                  <ThemedText style={[styles.summaryText, { color: colors.text }]}>
                    <ThemedText style={{ fontWeight: FontWeights.semibold }}>
                      {inputValue} {selectedFromUnit?.symbol}
                    </ThemedText>
                    <ThemedText style={{ color: colors.textSecondary }}> equals </ThemedText>
                    <ThemedText style={{ fontWeight: FontWeights.semibold, color: categoryColor }}>
                      {result} {selectedToUnit?.symbol}
                    </ThemedText>
                  </ThemedText>
                </View>
              </AppCard>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  headerSection: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: Spacing.sm,
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  inputCard: {
    padding: 0,
  },
  input: {
    marginBottom: 0,
  },
  unitsSection: {
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
    ...Shadows.sm,
  },
  resultCard: {
    borderWidth: 2,
  },
  resultContainer: {
    padding: Spacing.xl,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  resultLabel: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  copyButton: {
    padding: Spacing.xs,
  },
  successResultContainer: {
    alignItems: 'center',
  },
  resultValue: {
    fontSize: FontSizes.xxxxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  resultUnit: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  errorResultContainer: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  errorText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    fontWeight: FontWeights.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  summaryCard: {
    borderRadius: BorderRadius.lg,
  },
  summaryContent: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  summaryText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: FontSizes.md * 1.4,
  },
});
