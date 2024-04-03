import { fallbackLng } from "@/lib/i18n/settings";
import {
  Calculator,
  CalculatorValues,
  NonNullableCalculatorValues,
} from "@/types/calculators";
import Equations from "./equations";
import LaTeXComposer from "./latex";
import Config from "./config";

const cleanInput = (values: CalculatorValues): NonNullableCalculatorValues => {
  const nonNullValues: NonNullableCalculatorValues = {};

  Object.keys(values).forEach((key) => {
    nonNullValues[key] = values[key] ?? undefined;
  });

  return nonNullValues;
};

const Calculator: Calculator = (equation, value, locale = fallbackLng) => {
  const variables = cleanInput(value);
  const config = Config[equation];

  if (typeof config === "undefined") {
    console.error(`Equation ${equation} does not exist`);
  }

  const { inputs, constants } = config;

  const result = Equations[equation](variables, constants);

  return {
    inputs,
    result,
    latex: LaTeXComposer(
      config,
      {
        variables,
        result,
      },
      locale
    ),
  };
};

export default Calculator;
