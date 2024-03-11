import { Calculator, Equation } from "@/types/calculators";
import round from "lodash/round";

const peakAbsoluteMagnitude: Calculator = ({ m15 }) => {
  const A = -23.598;
  const B = 6.457;

  const result = round(A + B * m15, 2);

  if (typeof m15 !== "number" || Number.isNaN(result)) {
    return {
      result: undefined,
      toLaTeX: () => undefined,
    };
  }

  return {
    result,
    toLaTeX: () => `${result} = 23.59 + 6.45\\left ( ${m15} \\right )`,
  };
};

/** Distance in Megalightyears (Mly) */
const supernovaDistance: Calculator = ({ peakApparent, peakAbsolute }) => {
  const exponent = (peakApparent - peakAbsolute) / 5 + 1;

  const result = round((3.26 * Math.pow(10, exponent)) / Math.pow(10, 6));

  if (
    typeof peakApparent !== "number" ||
    typeof peakAbsolute !== "number" ||
    Number.isNaN(result)
  ) {
    return {
      result: undefined,
      toLaTeX: () => undefined,
    };
  }

  return {
    result,
    toLaTeX: () =>
      `${result} Mly = \\left (3.26\\right )10^{\\frac{${peakApparent} - ${peakAbsolute}}{5} + 1}`,
  };
};

const calculators: Record<Equation, Calculator> = {
  peakAbsoluteMagnitude,
  supernovaDistance,
};

export default calculators;
