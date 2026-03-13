import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedText } from "@/components/themed-text";
import { AppCard } from "../components/common/AppCard";
import { CONVERSION_CATEGORIES } from "../constants/units";
import { Colors, Spacing, FontSizes } from "../constants/colors";
import { ConversionCategory } from "../types/unit.types";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleCategoryPress = (category: ConversionCategory) => {
    navigation.navigate("Converter", {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const renderCategoryItem = ({ item }: { item: ConversionCategory }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.7}
    >
      <AppCard variant="elevated">
        <View style={styles.categoryContent}>
          <IconSymbol name={item.icon as any} size={40} color={colors.primary} />
          <ThemedText style={styles.categoryTitle}>{item.name}</ThemedText>
          <ThemedText style={[styles.categorySubtitle, { color: colors.textSecondary }]}>
            {item.units.length} units
          </ThemedText>
        </View>
      </AppCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Unit Converter</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Convert between different units of measurement
        </ThemedText>
      </View>

      <FlatList
        data={CONVERSION_CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    textAlign: "center",
  },
  listContainer: {
    padding: Spacing.md,
  },
  categoryItem: {
    flex: 1,
    margin: Spacing.sm,
    maxWidth: "50%",
  },
  categoryContent: {
    alignItems: "center",
    padding: Spacing.md,
  },
  categoryTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    textAlign: "center",
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  categorySubtitle: {
    fontSize: FontSizes.sm,
    textAlign: "center",
  },
});
