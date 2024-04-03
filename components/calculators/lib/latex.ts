import isNumber from "lodash/isNumber";
import { fallbackLng } from "@/lib/i18n/settings";
import {
  Variable,
  Constant,
  Result,
  EquationConfig,
} from "@/types/calculators";
import { Variables } from "./config";

const withClass = (value: string) => `\\class{calc-output}{${value}}`;

const formatConstant = ({ precision, value }: Constant, locale = fallbackLng) =>
  Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);

const formatVariable = ({
  variable,
  config: { precision, sigFigs, placeholder },
  locale = fallbackLng,
}: {
  variable?: number;
  config: Variable;
  locale?: string;
}) => {
  if (isNumber(variable)) {
    return Intl.NumberFormat(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      maximumSignificantDigits: sigFigs,
    }).format(variable);
  }

  return placeholder;
};

const formatResult = ({
  result: variable,
  config: { addUnit, ...config },
  locale = fallbackLng,
}: {
  result?: number;
  config: Result;
  locale?: string;
}) => {
  if (isNumber(variable) && addUnit) {
    return withClass(addUnit(formatVariable({ variable, config, locale })));
  }

  return withClass(
    formatVariable({
      variable,
      config,
      locale,
    })
  );
};

const LaTeXComposer = (
  equation: EquationConfig,
  values: { result?: number; variables: Record<string, number | undefined> },
  locale = fallbackLng
) => {
  const { latex, constants, result: resultConfig } = equation;
  const { result, variables } = values;

  const formattedConstants: Record<string, string> = {};
  const formattedVariables: Record<string, string> = {};

  Object.entries(constants).map(([key, constant]) => {
    formattedConstants[key] = formatConstant(constant, locale);
  });

  Object.entries(variables).map(([key, variable]) => {
    formattedVariables[key] = formatVariable({
      variable,
      config: Variables[key],
      locale,
    });
  });

  return latex({
    result: formatResult({ result, config: resultConfig, locale }),
    constants: formattedConstants,
    variables: formattedVariables,
  });
};

export default LaTeXComposer;
