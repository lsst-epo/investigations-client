import { FunctionComponent } from "react";
import { CalculatorValues, Equation } from "@/types/calculators";
import Calculator from "@/components/calculators/lib";
import EquationRenderer from "@/components/atomic/Equation";
import { fallbackLng } from "@/lib/i18n/settings";

const StaticCalculator: FunctionComponent<{
  equation: Equation;
  value: CalculatorValues;
  locale?: string;
}> = ({ equation, value, locale = fallbackLng }) => {
  const { latex } = Calculator(equation, value, locale);

  return <EquationRenderer latex={latex} />;
};

StaticCalculator.displayName = "Calculator.Static";

export default StaticCalculator;
