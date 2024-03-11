import { FunctionComponent } from "react";
import { CalculatorValues, Equation } from "@/types/calculators";
import Equations from "@/components/calculators/math";
import EquationRenderer from "@/components/atomic/Equation";

const StaticCalculator: FunctionComponent<{
  type: Equation;
  value: CalculatorValues;
}> = ({ type, value }) => {
  const equation = Equations[type];
  const latex = equation(value).toLaTeX();
  if (!equation || !latex) return null;

  return <EquationRenderer latex={latex} />;
};

StaticCalculator.displayName = "Calculator.Static";

export default StaticCalculator;
