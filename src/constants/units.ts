import { ConversionCategory } from '../types/unit.types';
import { CategoryIcons } from '../components/common/Icon';

export const CONVERSION_CATEGORIES: ConversionCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: CategoryIcons.length,
    description: 'Convert between different units of length and distance',
    units: [
      { id: 'mm', name: 'Millimeter', symbol: 'mm', category: 'length' },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', category: 'length' },
      { id: 'm', name: 'Meter', symbol: 'm', category: 'length' },
      { id: 'km', name: 'Kilometer', symbol: 'km', category: 'length' },
    ],
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: CategoryIcons.weight,
    description: 'Convert between different units of mass and weight',
    units: [
      { id: 'mg', name: 'Milligram', symbol: 'mg', category: 'weight' },
      { id: 'g', name: 'Gram', symbol: 'g', category: 'weight' },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', category: 'weight' },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: CategoryIcons.temperature,
    description: 'Convert between different temperature scales',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', category: 'temperature' },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', category: 'temperature' },
      { id: 'K', name: 'Kelvin', symbol: 'K', category: 'temperature' },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    icon: CategoryIcons.area,
    description: 'Convert between different units of area and surface',
    units: [
      { id: 'm²', name: 'Square Meter', symbol: 'm²', category: 'area' },
      { id: 'km²', name: 'Square Kilometer', symbol: 'km²', category: 'area' },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: CategoryIcons.volume,
    description: 'Convert between different units of volume and capacity',
    units: [
      { id: 'ml', name: 'Milliliter', symbol: 'ml', category: 'volume' },
      { id: 'l', name: 'Liter', symbol: 'l', category: 'volume' },
    ],
  },
];

export const getCategoryById = (id: string) => {
  return CONVERSION_CATEGORIES.find(category => category.id === id);
};

export const getUnitById = (unitId: string, categoryId: string) => {
  const category = getCategoryById(categoryId);
  return category?.units.find(unit => unit.id === unitId);
};