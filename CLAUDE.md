# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `unit-converter/` directory.

```bash
npm start          # Start Expo dev server (scan QR with Expo Go)
npm run android    # Start with Android emulator
npm run ios        # Start with iOS simulator
npm run web        # Start with web browser
npm run lint       # Run ESLint
```

EAS builds (requires `eas-cli` and Expo account login):
```bash
eas build --platform android --profile preview     # APK for device testing
eas build --platform android --profile production  # AAB for Play Store
eas submit --platform android                      # Upload AAB to Play Console
```

There are no tests in this project.

## Architecture

### Navigation
Uses **Expo Router** (file-based routing). The active routes are:
- `app/index.tsx` — Home screen: category grid with `FlatList`, navigates to converter via `useRouter().push`
- `app/converter.tsx` — Converter screen: reads `categoryId` + `categoryName` via `useLocalSearchParams`, uses inline `<Stack.Screen>` to set per-category header color dynamically
- `app/_layout.tsx` — Root `Stack` navigator with shared header styling

> **Dead code**: `src/screens/HomeScreen.tsx`, `src/screens/ConverterScreen.tsx`, and `src/navigation/AppNavigator.tsx` are vestigial from a previous React Navigation approach and are not used by the app. Do not add logic there.

### Data Flow
`src/constants/units.ts` is the single source of truth for all categories and units. It exports `CONVERSION_CATEGORIES` (array), `getCategoryById()`, and `getUnitById()`. To add a new category or unit, only this file and `src/utils/converters.ts` need to change.

`src/utils/converters.ts` exposes:
- `convert(value, fromUnit, toUnit, categoryId)` — dispatches to per-category converters
- `formatResult(value)` — scientific notation for very small/large numbers, 6 sig figs otherwise
- `validateNumericInput(input)` — validates a string input, returns `{ isValid, error? }`

Each category converts through a base unit (meter, gram, Celsius, m², liter). Temperature uses Celsius as an intermediate step.

### Theming & Design Tokens
`src/constants/colors.ts` exports:
- `Colors` — `{ light, dark }` objects; index with `Colors[colorScheme ?? 'light']`
- `getCategoryColor(categoryId, colorScheme)` — per-category accent color
- `Spacing`, `BorderRadius`, `FontSizes`, `FontWeights`, `Shadows`, `Animations` — design token constants (values are pre-scaled via `responsiveSpacing`/`responsiveFontSize`)

`src/constants/responsive.ts` provides:
- `responsiveSpacing(size)` / `responsiveFontSize(size)` — scale to screen width (base: 375px)
- `isSmallDevice()`, `isTablet()`, `getGridColumns()` — device classification helpers

### Component conventions
- `ThemedText` — use instead of `<Text>` for automatic theme-aware text color
- `AppCard`, `AppInput`, `AppDropdown`, `AppButton` — reusable UI primitives in `src/components/common/`
- `Icon` component wraps `MaterialIcons`, `MaterialCommunityIcons`, `Ionicons`, `FontAwesome5`, `Feather` from `@expo/vector-icons`
- `CategoryIcons` and `UIIcons` in `src/components/common/Icon.tsx` are the canonical icon references — use these instead of referencing icon names directly

### Styling approach
NativeWind v4 is configured — use `className` props where components support it, `StyleSheet` elsewhere. Most existing screens use `StyleSheet` with the design token constants from `colors.ts`.

## Key Config

- **Android package**: `com.mahi0092.unitconverter` (in `app.json`)
- **EAS project ID**: `397b79de-f3ac-4f50-ba13-666ad2f592c9`
- **Build profiles**: `development` (dev client), `preview` (APK), `production` (AAB, credentials on Expo servers)
