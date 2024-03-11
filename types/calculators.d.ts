export type Equation = "peakAbsoluteMagnitude" | "supernovaDistance";
export type CalculatorValues = Record<string, number>;

export type Calculator<T = CalculatorValues> = (variables: T) => {
  result: number | undefined;
  toLaTeX: () => string | undefined;
};

export interface CalculatorProps<T = CalculatorValues> {
  equation: CalculatorFunction<T>;
  value?: T;
}
export interface InteractiveCalculatorProps<T = CalculatorValues>
  extends CalculatorProps<T> {
  id: string;
  onChangeCallback: (value: Partial<T>) => void;
  className?: string;
}
