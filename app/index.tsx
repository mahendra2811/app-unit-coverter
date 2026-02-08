import React from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { AppCard } from '../src/components/common/AppCard';
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
  SCREEN_DIMENSIONS, 
  getGridColumns, 
  responsiveSpacing,
  responsiveFontSize 
} from '../src/constants/responsive';
import { ConversionCategory } from '../src/types/unit.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const renderCategoryItem = ({ item, index }: { item: ConversionCategory; index: number }) => {
    const categoryColor = getCategoryColor(item.id, colorScheme ?? 'light');
    const itemWidth = (SCREEN_WIDTH - (Spacing.lg * 2) - (Spacing.md * (gridColumns - 1))) / gridColumns;
    
    return (
      <TouchableOpacity
        style={[styles.categoryItem, { width: itemWidth }]}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.8}
      >
        <Animated.View style={[
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
              backgroundColor: categoryColor + '15',
              borderColor: categoryColor + '30',
            }
          ]}>
            <Icon
              family={item.icon.family}
              name={item.icon.name}
              size={responsiveSpacing(32)}
              color={categoryColor}
            />
          </View>

          {/* Content */}
          <View style={styles.categoryContent}>
            <ThemedText style={[
              styles.categoryTitle,
              { color: colors.text }
            ]}>
              {item.name}
            </ThemedText>
            
            <ThemedText style={[
              styles.categoryDescription,
              { color: colors.textSecondary }
            ]}>
              {item.units.length} units
            </ThemedText>
          </View>

          {/* Accent Line */}
          <View style={[
            styles.accentLine,
            { backgroundColor: categoryColor }
          ]} />
        </Animated.View>
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
          <View style={styles.headerContent}>
            <ThemedText style={[styles.title, { color: colors.text }]}>
              Unit Converter
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
              Convert between different units of measurement
            </ThemedText>
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.content}>
          <FlatList
            data={CONVERSION_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={gridColumns}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            key={gridColumns} // Force re-render when columns change
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: responsiveSpacing(20),
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxxxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.normal,
    textAlign: 'center',
    lineHeight: FontSizes.md * 1.4,
    maxWidth: '80%',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  listContainer: {
    paddingBottom: Spacing.xl,
  },
  categoryItem: {
    marginBottom: Spacing.md,
    marginRight: Spacing.md,
  },
  categoryCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    minHeight: responsiveSpacing(140),
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    width: responsiveSpacing(64),
    height: responsiveSpacing(64),
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  categoryContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  categoryDescription: {
    fontSize: FontSizes.sm,
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
