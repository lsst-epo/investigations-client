import round from "lodash/round";
import isNumber from "lodash/isNumber";
import { Equation, EquationComposer } from "@/types/calculators";

const peakAbsoluteMagnitude: EquationComposer = ({ m15 }) => {
  const A = -23.598;
  const B = 6.457;

  if (isNumber(m15)) {
    const result = round(A + B * m15, 1);

    return { constants: { A, B }, result };
  }

  return { constants: { A, B } };
};

const supernovaDistance: EquationComposer = ({
  peakApparentMagnitude,
  peakAbsoluteMagnitude,
}) => {
  const A = 3.26;
  const B = 10;
  const C = 5;
  const D = 1;

  if (isNumber(peakApparentMagnitude) && isNumber(peakAbsoluteMagnitude)) {
    const exponent = (peakApparentMagnitude - peakAbsoluteMagnitude) / C + D;
    const result = round((A * Math.pow(B, exponent)) / Math.pow(B, 6));

    return { constants: { A, B, C, D }, result };
  }

  return { constants: { A, B, C, D } };
};

const Equations: Record<Equation, EquationComposer> = {
  peakAbsoluteMagnitude,
  supernovaDistance,
};

export default Equations;
