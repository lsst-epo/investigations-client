import { CalculatorInput, Equation } from "@/types/calculators";
import placeholders from "./placeholders";

const FormFields: Record<Equation, Record<string, CalculatorInput>> = {
  peakAbsoluteMagnitude: {
    m15: { key: "m15", precision: 2, label: `${placeholders.m15} =` },
  },
  supernovaDistance: {
    peakApparentMagnitude: {
      key: "peakApparentMagnitude",
      precision: 1,
      label: `${placeholders.peakApparentMagnitude} =`,
    },
    peakAbsoluteMagnitude: {
      key: "peakAbsoluteMagnitude",
      precision: 1,
      label: `${placeholders.peakAbsoluteMagnitude} =`,
    },
  },
};

export default FormFields;
