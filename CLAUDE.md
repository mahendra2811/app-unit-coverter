# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `unit-converter/` directory.

```bash
npm start          # Start Expo dev server (scan QR with Expo Go)
npm run android    # Start with Android emulator
npm run ios        # Start with iOS simulator
npm run lint       # Run ESLint
```

EAS builds (requires `eas-cli` and Expo account login):
```bash
eas build --platform android --profile preview     # APK for device testing
eas build --platform android --profile production  # AAB for Play Store
eas submit --platform android                      # Upload AAB to Play Console
```

## Architecture

### Navigation
Uses **Expo Router** (file-based routing). The two routes are:
- `app/index.tsx` — Home screen (category grid)
- `app/converter.tsx` — Converter screen (receives `categoryId` + `categoryName` as params)
- `app/_layout.tsx` — Root `Stack` navigator with shared header styling

The `app/` files are thin shells that import real components from `src/`. Do not put logic in `app/` files.

### Data Flow
`src/constants/units.ts` is the single source of truth for all categories and units. It exports `CONVERSION_CATEGORIES` (array) and `getCategoryById()`. To add a new category or unit, only this file and `src/utils/converters.ts` need to change.

`src/utils/converters.ts` exposes two public functions:
- `convert(value, fromUnit, toUnit, categoryId)` — dispatches to per-category converters
- `formatResult(value)` — smart formatting (scientific notation for very small/large numbers, 6 sig figs otherwise)

Each category converts through a base unit (meter, gram, Celsius, m², liter). Temperature is the exception — it uses Celsius as an intermediate step.

### Theming
`src/constants/colors.ts` exports the full `Colors` object with `light` and `dark` keys. All screens call `useColorScheme()` and index into `Colors[colorScheme ?? 'light']`. `getCategoryColor(categoryId, colorScheme)` returns the per-category accent color used on the converter screen header and interactive elements.

`src/constants/responsive.ts` provides `responsiveSpacing()` and `responsiveFontSize()` helpers used throughout styles.

### Component conventions
- `ThemedText` — use instead of `<Text>` for automatic theme-aware text color
- `AppCard`, `AppInput`, `AppDropdown` — reusable UI primitives in `src/components/common/`
- `Icon` component wraps multiple icon families; `CategoryIcons` and `UIIcons` in `src/components/common/Icon.tsx` are the canonical icon references

## Key Config

- **Android package**: `com.mahi0092.unitconverter` (in `app.json`)
- **EAS project ID**: `397b79de-f3ac-4f50-ba13-666ad2f592c9`
- **Build profiles**: `development` (dev client), `preview` (APK), `production` (AAB, credentials on Expo servers)
- NativeWind v4 is configured — use `className` props where components support it, `StyleSheet` elsewhere
