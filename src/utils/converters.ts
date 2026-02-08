import { UnitCategory } from '../types/unit.types';

// Length conversions (base unit: meter)
export const convertLength = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert to base unit (meters)
  let baseValue: number;
  
  switch (fromUnit) {
    case 'mm': baseValue = value / 1000; break;
    case 'cm': baseValue = value / 100; break;
    case 'm': baseValue = value; break;
    case 'km': baseValue = value * 1000; break;
    default: throw new Error(`Unsupported length unit: ${fromUnit}`);
  }
  
  // Convert from base unit to target unit
  switch (toUnit) {
    case 'mm': return baseValue * 1000;
    case 'cm': return baseValue * 100;
    case 'm': return baseValue;
    case 'km': return baseValue / 1000;
    default: throw new Error(`Unsupported length unit: ${toUnit}`);
  }
};

// Weight conversions (base unit: gram)
export const convertWeight = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert to base unit (grams)
  let baseValue: number;
  
  switch (fromUnit) {
    case 'mg': baseValue = value / 1000; break;
    case 'g': baseValue = value; break;
    case 'kg': baseValue = value * 1000; break;
    default: throw new Error(`Unsupported weight unit: ${fromUnit}`);
  }
  
  // Convert from base unit to target unit
  switch (toUnit) {
    case 'mg': return baseValue * 1000;
    case 'g': return baseValue;
    case 'kg': return baseValue / 1000;
    default: throw new Error(`Unsupported weight unit: ${toUnit}`);
  }
};

// Temperature conversions
export const convertTemperature = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) return value;
  
  // Convert to Celsius as intermediate step
  let celsius: number;
  
  switch (fromUnit) {
    case 'C': celsius = value; break;
    case 'F': celsius = (value - 32) * 5/9; break;
    case 'K': celsius = value - 273.15; break;
    default: throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }
  
  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'C': return celsius;
    case 'F': return (celsius * 9/5) + 32;
    case 'K': return celsius + 273.15;
    default: throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
};

// Area conversions (base unit: square meter)
export const convertArea = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert to base unit (square meters)
  let baseValue: number;
  
  switch (fromUnit) {
    case 'm²': baseValue = value; break;
    case 'km²': baseValue = value * 1000000; break;
    default: throw new Error(`Unsupported area unit: ${fromUnit}`);
  }
  
  // Convert from base unit to target unit
  switch (toUnit) {
    case 'm²': return baseValue;
    case 'km²': return baseValue / 1000000;
    default: throw new Error(`Unsupported area unit: ${toUnit}`);
  }
};

// Volume conversions (base unit: liter)
export const convertVolume = (value: number, fromUnit: string, toUnit: string): number => {
  // Convert to base unit (liters)
  let baseValue: number;
  
  switch (fromUnit) {
    case 'ml': baseValue = value / 1000; break;
    case 'l': baseValue = value; break;
    default: throw new Error(`Unsupported volume unit: ${fromUnit}`);
  }
  
  // Convert from base unit to target unit
  switch (toUnit) {
    case 'ml': return baseValue * 1000;
    case 'l': return baseValue;
    default: throw new Error(`Unsupported volume unit: ${toUnit}`);
  }
};

// Main converter function
export const convert = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number => {
  if (fromUnit === toUnit) return value;
  
  if (isNaN(value) || !isFinite(value)) {
    throw new Error('Invalid input value');
  }
  
  switch (category) {
    case 'length': return convertLength(value, fromUnit, toUnit);
    case 'weight': return convertWeight(value, fromUnit, toUnit);
    case 'temperature': return convertTemperature(value, fromUnit, toUnit);
    case 'area': return convertArea(value, fromUnit, toUnit);
    case 'volume': return convertVolume(value, fromUnit, toUnit);
    default: throw new Error(`Unsupported category: ${category}`);
  }
};

// Format result for display
export const formatResult = (value: number): string => {
  // Handle special cases
  if (!isFinite(value)) {
    return 'Invalid';
  }
  
  if (value === 0) {
    return '0';
  }
  
  // For very small or very large numbers, use scientific notation
  if (Math.abs(value) < 0.0001 || Math.abs(value) > 9999999) {
    return value.toExponential(4);
  }
  
  // For regular numbers, limit to 6 significant digits and remove trailing zeros
  const formatted = parseFloat(value.toPrecision(6)).toString();
  return formatted;
};

// Validate numeric input
export const validateNumericInput = (input: string): { isValid: boolean; error?: string } => {
  if (input === '') {
    return { isValid: true };
  }
  
  // Allow only numbers, decimal point, and minus sign
  if (!/^-?\d*\.?\d*$/.test(input)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  // Check for multiple decimal points
  if ((input.match(/\./g) || []).length > 1) {
    return { isValid: false, error: 'Invalid decimal format' };
  }
  
  // Check for multiple minus signs or minus not at the beginning
  if (input.includes('-') && (input.indexOf('-') !== 0 || (input.match(/-/g) || []).length > 1)) {
    return { isValid: false, error: 'Invalid negative number format' };
  }
  
  const numValue = parseFloat(input);
  if (!isNaN(numValue) && !isFinite(numValue)) {
    return { isValid: false, error: 'Number is too large' };
  }
  
  return { isValid: true };
};