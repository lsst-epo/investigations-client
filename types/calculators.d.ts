export type Equation = "peakAbsoluteMagnitude" | "supernovaDistance";
export type CalculatorValues = Record<string, number>;

export type CalculatorFunction<T = CalculatorValues> = (variables: T) => number;

export interface InteractiveCalculatorProps<T = CalculatorValues> {
  onChangeCallback: (value: Partial<T>) => void;
  calculatorFunction: CalculatorFunction<T>;
  value?: T;
  className?: string;
}
