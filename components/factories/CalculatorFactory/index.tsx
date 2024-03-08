import { FunctionComponent } from "react";
import { Equation, InteractiveCalculatorProps } from "@/types/calculators";
import InteractiveCalculators from "@/components/calculators/interactive";
import CalculatorFunctions from "@/components/calculators/equations";

interface CalculatorFactoryProps
  extends Omit<InteractiveCalculatorProps, "calculatorFunction"> {
  id: string;
  equation: Equation;
  locale: string;
}

const CalculatorFactory: FunctionComponent<CalculatorFactoryProps> = ({
  equation,
  ...props
}) => {
  const Calculator = InteractiveCalculators[equation];

  if (!Calculator) {
    console.error(`${equation} calculator is not defined`);
    return null;
  }

  return (
    <Calculator {...props} calculatorFunction={CalculatorFunctions[equation]} />
  );
};

CalculatorFactory.displayName = "Factory.Calculator";

export default CalculatorFactory;
