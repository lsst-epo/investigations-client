export type Equation = "peakAbsoluteMagnitude" | "distanceModulus";
export type StoredCalculatorValues = Record<string, string | null | undefined>;
export type NumericCalculatorValues = Record<string, number | undefined>;

export interface Variable {
  key: string;
  precision: number;
  sigFigs?: number;
  placeholder: string;
}

export interface Constant {
  value: number;
  precision?: number;
}

export interface Result extends Variable {
  addUnit?: (value: string | number) => string;
}

export interface LaTeXBindings {
  result: string | number;
  constants: Record<string, string | number>;
  variables: Record<string, string | number>;
}

export interface EquationConfig {
  latex: (props: LaTeXBindings) => string;
  constants: Record<string, Constant>;
  inputs: Array<Variable>;
  result: Result;
}

export type Calculator<T = StoredCalculatorValues> = (
  equation: Equation,
  variables: T,
  locale?: string
) => {
  inputs: Array<Variable>;
  result: number | undefined;
  latex: string;
};

export interface InteractiveCalculatorProps<T = StoredCalculatorValues> {
  id: string;
  equation: Equation;
  onChangeCallback: (value: Partial<T>) => void;
  className?: string;
  value?: T;
}

export type EquationComposer = (
  values: NumericCalculatorValues,
  constants: Record<string, Constant>
) => number | undefined;
