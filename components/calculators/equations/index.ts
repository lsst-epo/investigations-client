import { CalculatorFunction, Equation } from "@/types/calculators";

const peakAbsoluteMagnitude: CalculatorFunction = ({ m15 }) => {
  const A = -23.598;
  const B = 6.457;

  return A + B * m15;
};
const supernovaDistance: CalculatorFunction = ({
  peakApparent,
  peakAbsolute,
}) => {
  const exponent = (peakApparent - peakAbsolute) / 5 + 1;

  return Math.pow(10, exponent) / Math.pow(10, 6);
};

const equations: Record<Equation, CalculatorFunction> = {
  peakAbsoluteMagnitude,
  supernovaDistance,
};

export default equations;
