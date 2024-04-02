import isNumber from "lodash/isNumber";
import { fallbackLng } from "@/lib/i18n/settings";
import { LaTeXComposer } from "@/types/calculators";
import placeholders from "./placeholders";
import Equations from "./equations";

const withClass = (value: string) => `\\class{calc-output}{${value}}`;

const peakAbsoluteMagnitude: LaTeXComposer = (
  { result = placeholders.peakAbsoluteMagnitude, m15 = placeholders.m15 },
  locale = fallbackLng
) => {
  const {
    constants: { A, B },
  } = Equations.peakAbsoluteMagnitude({});

  const { format } = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const { format: resultFormat } = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const displayResult = isNumber(result) ? resultFormat(result) : result;
  const displayM15 = isNumber(m15) ? format(m15) : m15;

  return `${withClass(displayResult)} = ${format(A)} + ${format(
    B
  )}\\left ( ${displayM15} \\right )`;
};

const supernovaDistance: LaTeXComposer = (
  {
    result = placeholders.distance,
    peakAbsoluteMagnitude = placeholders.peakAbsoluteMagnitude,
    peakApparentMagnitude = placeholders.peakApparentMagnitude,
  },
  locale = fallbackLng
) => {
  const {
    constants: { A, B, C, D },
  } = Equations.supernovaDistance({});

  const { format } = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const displayResult = isNumber(result)
    ? `${Intl.NumberFormat(locale, {
        maximumSignificantDigits: 3,
      }).format(result)}\\space\\text{Mly}`
    : result;
  const displayPeakAbsolute = isNumber(peakAbsoluteMagnitude)
    ? format(peakAbsoluteMagnitude)
    : peakAbsoluteMagnitude;
  const displayPeakApparent = isNumber(peakApparentMagnitude)
    ? format(peakApparentMagnitude)
    : peakApparentMagnitude;

  return `${withClass(displayResult)} = \\left (${Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(
    A
  )}\\right )${B}^{\\frac{${displayPeakApparent} - ${displayPeakAbsolute}}{${C}} + ${D}}`;
};

const LaTeX = {
  peakAbsoluteMagnitude,
  supernovaDistance,
};

export default LaTeX;
