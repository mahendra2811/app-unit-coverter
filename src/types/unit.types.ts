import { IconFamily } from "../components/common/Icon";

export type UnitCategory = "length" | "weight" | "temperature" | "area" | "volume";

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  category: UnitCategory;
}

export interface IconConfig {
  family: IconFamily;
  name: string;
}

export interface ConversionCategory {
  id: UnitCategory;
  name: string;
  icon: IconConfig;
  description: string;
  units: Unit[];
}

export interface ConversionResult {
  value: number;
  unit: string;
  formatted: string;
}

export interface ConversionError {
  message: string;
  code: string;
}
