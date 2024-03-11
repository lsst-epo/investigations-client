import "@/lib/temml/Temml-Latin-Modern.css";
import { FunctionComponent } from "react";
import { LatinModernMath, Temml } from "@/lib/fonts";
import { Equation, InteractiveCalculatorProps } from "@/types/calculators";
import InteractiveCalculators from "@/components/calculators/interactive";
import Calculators from "@/components/calculators/math";

interface CalculatorFactoryProps
  extends Omit<InteractiveCalculatorProps, "equation"> {
  type: Equation;
}

const CalculatorFactory: FunctionComponent<CalculatorFactoryProps> = ({
  type,
  ...props
}) => {
  const Calculator = InteractiveCalculators[type];

  if (!Calculator) {
    console.error(`${type} calculator is not defined`);
    return null;
  }

  return (
    <Calculator
      {...props}
      className={`${LatinModernMath.variable} ${Temml.variable}`}
      equation={Calculators[type]}
    />
  );
};

CalculatorFactory.displayName = "Factory.Calculator";

export default CalculatorFactory;
