import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { Icon } from '../src/components/common/Icon';
import { CONVERSION_CATEGORIES } from '../src/constants/units';
import {
  Colors,
  Spacing,
  FontSizes,
  FontWeights,
  BorderRadius,
  Shadows,
  getCategoryColor
} from '../src/constants/colors';
import {
  getGridColumns,
  responsiveSpacing,
} from '../src/constants/responsive';
import { ConversionCategory } from '../src/types/unit.types';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gridColumns = getGridColumns();

  const handleCategoryPress = (category: ConversionCategory) => {
    router.push({
      pathname: '/converter',
      params: {
        categoryId: category.id,
        categoryName: category.name,
      },
    });
  };

  const renderCategoryItem = ({ item }: { item: ConversionCategory }) => {
    const categoryColor = getCategoryColor(item.id, colorScheme ?? 'light');

    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.categoryCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
          Shadows.md
        ]}>
          {/* Icon Container */}
          <View style={[
            styles.iconContainer,
            {
              backgroundColor: categoryColor + '18',
              borderColor: categoryColor + '35',
            }
          ]}>
            <Icon
              family={item.icon.family}
              name={item.icon.name}
              size={responsiveSpacing(28)}
              color={categoryColor}
            />
          </View>

          {/* Content */}
          <View style={styles.categoryContent}>
            <ThemedText style={[styles.categoryTitle, { color: colors.text }]}>
              {item.name}
            </ThemedText>
            <ThemedText style={[styles.categoryDescription, { color: colors.textSecondary }]}>
              {item.units.length} units
            </ThemedText>
          </View>

          {/* Accent Line */}
          <View style={[styles.accentLine, { backgroundColor: categoryColor }]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Unit Converter
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Pick a category to start converting
          </ThemedText>
        </View>

        {/* Categories Grid */}
        <FlatList
          data={CONVERSION_CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={gridColumns}
          key={gridColumns}
          columnWrapperStyle={gridColumns > 1 ? styles.row : undefined}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: responsiveSpacing(16),
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    textAlign: 'center',
  },
  row: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  listContainer: {
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  categoryItem: {
    flex: 1,
  },
  categoryCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.md,
    alignItems: 'center',
    minHeight: responsiveSpacing(130),
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    gap: Spacing.sm,
  },
  iconContainer: {
    width: responsiveSpacing(52),
    height: responsiveSpacing(52),
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.normal,
    textAlign: 'center',
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
});
