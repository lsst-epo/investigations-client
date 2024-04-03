import round from "lodash/round";
import isNumber from "lodash/isNumber";
import { Equation, EquationComposer } from "@/types/calculators";

const peakAbsoluteMagnitude: EquationComposer = ({ m15 }, { A, B }) => {
  if (isNumber(m15)) {
    const result = round(A.value + B.value * m15, 1);

    return result;
  }

  return undefined;
};

const distanceMly: EquationComposer = (
  { peakApparentMagnitude, peakAbsoluteMagnitude },
  { A, B, C, D }
) => {
  if (isNumber(peakApparentMagnitude) && isNumber(peakAbsoluteMagnitude)) {
    const exponent =
      (peakApparentMagnitude - peakAbsoluteMagnitude) / C.value + D.value;
    const result = round(
      (A.value * Math.pow(B.value, exponent)) / Math.pow(10, 6)
    );

    return result;
  }

  return undefined;
};

const Equations: Record<Equation, EquationComposer> = {
  peakAbsoluteMagnitude,
  distanceMly,
};

export default Equations;
