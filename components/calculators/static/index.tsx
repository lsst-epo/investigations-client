import { FunctionComponent } from "react";
import { CalculatorValues, Equation } from "@/types/calculators";
import Equations from "@/components/calculators/math";
import EquationRenderer from "@/components/atomic/Equation";
import { fallbackLng } from "@/lib/i18n/settings";

const StaticCalculator: FunctionComponent<{
  type: Equation;
  value: CalculatorValues;
  locale?: string;
}> = ({ type, value, locale = fallbackLng }) => {
  const equation = Equations[type];
  const latex = equation(value, locale).toLaTeX();
  if (!equation || !latex) return null;

  return <EquationRenderer latex={latex} />;
};

StaticCalculator.displayName = "Calculator.Static";

export default StaticCalculator;
