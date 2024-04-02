export type Equation = "peakAbsoluteMagnitude" | "supernovaDistance";
export type CalculatorValues = Record<string, number | null | undefined>;
export type NonNullableCalculatorValues = Record<string, number | undefined>;

export interface CalculatorInput {
  key: string;
  label: string;
  precision: number;
}

export type Calculator<T = CalculatorValues> = (
  equation: Equation,
  variables: T,
  locale?: string
) => {
  fields: Record<string, CalculatorInput>;
  result: number | undefined;
  latex: string;
};

export interface InteractiveCalculatorProps<T = CalculatorValues> {
  id: string;
  equation: Equation;
  onChangeCallback: (value: Partial<T>) => void;
  className?: string;
  value?: T;
}

export type EquationComposer = (values: NonNullableCalculatorValues) => {
  constants: Record<string, number>;
  result?: number;
};

export type LaTeXComposer = (
  variables: Record<string, string | number | undefined>,
  locale?: string
) => string;
