import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from '@/hooks/use-color-scheme';
import HomeScreen from '../screens/HomeScreen';
import ConverterScreen from '../screens/ConverterScreen';
import { Colors } from '../constants/colors';
import { UnitCategory } from '../types/unit.types';

export type RootStackParamList = {
  Home: undefined;
  Converter: {
    categoryId: UnitCategory;
    categoryName: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerBackVisible: true,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Converter" 
        component={ConverterScreen}
        options={({ route }) => ({ 
          title: `${route.params.categoryName} Converter`,
        })}
      />
    </Stack.Navigator>
  );
}