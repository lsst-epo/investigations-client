import { ComponentType } from "react";
import { Equation, InteractiveCalculatorProps } from "@/types/calculators";
import PeakAbsoluteMagnitude from "./PeakAbsoluteMagnitude";
import SupernovaDistance from "./SupernovaDistance";

const InteractiveCalculators: Record<
  Equation,
  ComponentType<InteractiveCalculatorProps>
> = {
  peakAbsoluteMagnitude: PeakAbsoluteMagnitude,
  supernovaDistance: SupernovaDistance,
};

export default InteractiveCalculators;
