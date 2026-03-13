import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { Icon } from '../src/components/common/Icon';
import { CONVERSION_CATEGORIES } from '../src/constants/units';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius, getCategoryColor } from '../src/constants/colors';
import { ConversionCategory } from '../src/types/unit.types';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleCategoryPress = (category: ConversionCategory) => {
    router.push({
      pathname: '/converter',
      params: { categoryId: category.id, categoryName: category.name },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={[styles.inner, isTablet && styles.innerTablet]}>
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Unit Converter
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Choose a category
          </ThemedText>
        </View>

        <View style={styles.list}>
          {CONVERSION_CATEGORIES.map((item) => {
            const categoryColor = getCategoryColor(item.id, colorScheme ?? 'light');
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
                onPress={() => handleCategoryPress(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, { backgroundColor: categoryColor + '20' }]}>
                  <Icon
                    family={item.icon.family}
                    name={item.icon.name}
                    size={isTablet ? 32 : 26}
                    color={categoryColor}
                  />
                </View>
                <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
                  {item.name}
                </ThemedText>
                <Icon
                  family="MaterialIcons"
                  name="chevron-right"
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  innerTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: isTablet ? FontSizes.xxxxl : FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.sm,
  },
  list: {
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: isTablet ? Spacing.lg : Spacing.md,
    gap: Spacing.md,
  },
  iconBox: {
    width: isTablet ? 56 : 48,
    height: isTablet ? 56 : 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    flex: 1,
    fontSize: isTablet ? FontSizes.xl : FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
});
