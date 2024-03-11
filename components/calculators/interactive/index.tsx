import { ComponentType } from "react";
import { Equation, InteractiveCalculatorProps } from "@/types/calculators";
import PeakAbsoluteMagnitude from "./peakAbsoluteMagnitude";
import SupernovaDistance from "./supernovaDistance";

const InteractiveCalculators: Record<
  Equation,
  ComponentType<InteractiveCalculatorProps>
> = {
  peakAbsoluteMagnitude: PeakAbsoluteMagnitude,
  supernovaDistance: SupernovaDistance,
};

export default InteractiveCalculators;
