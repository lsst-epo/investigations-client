import { Variable, EquationConfig, Equation } from "@/types/calculators";

export const Variables: Record<string, Variable> = {
  distanceMly: {
    key: "distanceMly",
    precision: 1,
    sigFigs: 3,
    placeholder: "d",
  },
  m15: { key: "m15", precision: 2, placeholder: "\\Delta m_{15}" },
  peakApparentMagnitude: {
    key: "peakApparentMagnitude",
    precision: 1,
    placeholder: "m",
  },
  peakAbsoluteMagnitude: {
    key: "peakAbsoluteMagnitude",
    precision: 1,
    placeholder: "M",
  },
  albedo: {
    key: "albedo",
    precision: 2,
    placeholder: "p"
  },
  absoluteMagnitude: {
    key: "absoluteMagnitude",
    precision: 2,
    placeholder: "H"
  },
  asteroidSize: {
    key: "asteroidSize",
    precision: 0,
    placeholder: "D"
  }
};

const Config: Record<Equation, EquationConfig> = {
  peakAbsoluteMagnitude: {
    latex: ({ result, constants, variables }) =>
      `${result} = ${constants.A} + ${constants.B}\\left ( ${variables.m15} \\right )`,
    constants: {
      A: { value: -23.598, precision: 2 },
      B: { value: 6.457, precision: 2 },
    },
    inputs: [Variables.m15],
    result: Variables.peakAbsoluteMagnitude,
  },
  distanceModulus: {
    latex: ({ result, constants, variables }) =>
      `${result} = \\left (${constants.A}\\right )${constants.B}^{\\frac{${variables.peakApparentMagnitude} - ${variables.peakAbsoluteMagnitude}}{${constants.C}}} + ${constants.D}`,
    constants: {
      A: { value: 3.26, precision: 2 },
      B: { value: 10 },
      C: { value: 5 },
      D: { value: 1 },
    },
    inputs: [Variables.peakApparentMagnitude, Variables.peakAbsoluteMagnitude],
    result: {
      ...Variables.distanceMly,
      addUnit: (value) => `${value}\\space\\text{Mly}`,
    },
  },
  asteroidSize: {
    latex: ({ result, constants, variables }) =>
      `${result} = \\frac {${constants.A}}{\\sqrt{${variables.albedo}}}${constants.B}^{${constants.C} \\times ${variables.absoluteMagnitude}}`,
    constants: {
      A: { value: 1329000 },
      B: { value: 10 },
      C: { value: -0.2 }
    },
    inputs: [Variables.albedo, Variables.absoluteMagnitude],
    result: Variables.asteroidSize
  }
};

export default Config;
