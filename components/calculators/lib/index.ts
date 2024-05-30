import { fallbackLng } from "@/lib/i18n/settings";
import isNil from "lodash/isNil";
import {
  type Calculator,
  StoredCalculatorValues,
  NumericCalculatorValues,
} from "@/types/calculators";
import Equations from "./equations";
import LaTeXComposer from "./latex";
import Config from "./config";

const storedToNumericValues = (
  values: StoredCalculatorValues
): NumericCalculatorValues => {
  const numericValues: NumericCalculatorValues = {};

  Object.keys(values).forEach((key) => {
    const value = values[key];
    numericValues[key] = isNil(value) ? undefined : parseFloat(value);

    if (isNil(value)) {
      numericValues[key] = undefined;
      return;
    }

    if (value === "") {
      numericValues[key] = undefined;
      return;
    }

    numericValues[key] = parseFloat(value);
  });

  return numericValues;
};

const Calculator: Calculator = (equation, value, locale = fallbackLng) => {
  const variables = storedToNumericValues(value);
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
