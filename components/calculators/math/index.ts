import { fallbackLng } from "@/lib/i18n/settings";
import { Calculator, Equation } from "@/types/calculators";
import round from "lodash/round";

const peakAbsoluteMagnitude: Calculator = ({ m15 }, locale = fallbackLng) => {
  const A = -23.598;
  const B = 6.457;

  const result = round(A + B * m15, 2);
  const { format } = new Intl.NumberFormat(locale);

  if (typeof m15 !== "number" || Number.isNaN(result)) {
    return {
      result: undefined,
      toLaTeX: () => undefined,
    };
  }

  return {
    result,
    toLaTeX: () =>
      `${format(result)} = ${format(-23.59)} + ${format(6.45)}\\left ( ${format(
        m15
      )} \\right )`,
  };
};

/** Distance in Megalightyears (Mly) */
const supernovaDistance: Calculator = (
  { peakApparent, peakAbsolute },
  locale = fallbackLng
) => {
  const exponent = (peakApparent - peakAbsolute) / 5 + 1;

  const result = round((3.26 * Math.pow(10, exponent)) / Math.pow(10, 6));
  const { format } = new Intl.NumberFormat(locale);

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
      `${format(result)} Mly = \\left (${format(
        3.26
      )}\\right )10^{\\frac{${format(peakApparent)} - ${format(
        peakAbsolute
      )}}{5} + 1}`,
  };
};

const calculators: Record<Equation, Calculator> = {
  peakAbsoluteMagnitude,
  supernovaDistance,
};

export default calculators;
