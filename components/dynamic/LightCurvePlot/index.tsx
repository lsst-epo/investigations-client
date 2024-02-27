import { FunctionComponent } from "react";
import { ObservationsPlot } from "@rubin-epo/epo-widget-lib/LightCurvePlot";

interface LightCurvePlotContainerProps {
  alerts?: Array<any>;
  peakMjd: number;
  activeAlertIndex?: number;
}

const LightCurvePlotContainer: FunctionComponent<
  LightCurvePlotContainerProps
> = ({ alerts = [], peakMjd, activeAlertIndex }) => {
  return (
    <ObservationsPlot
      activeAlertId={activeAlertIndex && alerts[activeAlertIndex].id}
      {...{ alerts, peakMjd }}
    />
  );
};

LightCurvePlotContainer.displayName = "Container.LightCurvePlot";

export default LightCurvePlotContainer;
