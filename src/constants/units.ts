import { ConversionCategory } from '../types/unit.types';
import { CategoryIcons } from '../components/common/Icon';

export const CONVERSION_CATEGORIES: ConversionCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: CategoryIcons.length,
    description: 'Convert between units of length',
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
    description: 'Convert between units of weight',
    units: [
      { id: 'mg', name: 'Milligram', symbol: 'mg', category: 'weight' },
      { id: 'g', name: 'Gram', symbol: 'g', category: 'weight' },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', category: 'weight' },
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