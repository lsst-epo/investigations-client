import { fallbackLng } from "@/lib/i18n/settings";
import {
  Calculator,
  CalculatorValues,
  NonNullableCalculatorValues,
} from "@/types/calculators";
import Equations from "./equations";
import LaTeX from "./latex";
import FormFields from "./fields";

const cleanInput = (values: CalculatorValues): NonNullableCalculatorValues => {
  const nonNullValues: NonNullableCalculatorValues = {};

  Object.keys(values).forEach((key) => {
    nonNullValues[key] = values[key] ?? undefined;
  });

  return nonNullValues;
};

const Calculator: Calculator = (equation, value, locale = fallbackLng) => {
  const cleaned = cleanInput(value);

  const { result } = Equations[equation](cleaned);

  return {
    fields: FormFields[equation],
    result,
    latex: LaTeX[equation](
      {
        ...cleaned,
        result,
      },
      locale
    ),
  };
};

export default Calculator;
