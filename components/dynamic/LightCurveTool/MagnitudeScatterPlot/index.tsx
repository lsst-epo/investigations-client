import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ObservationsPlot } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import { Alert } from "@/lib/api/hooks/useAlerts";

interface MagnitudeScatterPlotProps {
  alerts: Array<Alert>;
  activeAlertIndex?: number;
  peakMjd: number;
  url?: string;
  yMin?: number;
  yMax?: number;
  showPlot?: boolean;
}

const MagnitudeScatterPlotContainer: FunctionComponent<
  MagnitudeScatterPlotProps
> = ({
  activeAlertIndex,
  peakMjd,
  yMin,
  yMax,
  alerts = [],
  showPlot = true,
}) => {
  const { t } = useTranslation();

  const activeAlertId =
    typeof activeAlertIndex === "number"
      ? alerts[activeAlertIndex]?.id
      : undefined;

  return (
    <ObservationsPlot
      name={t("widgets.light_curve.title")}
      alerts={showPlot ? alerts : []}
      yMin={yMin || undefined}
      yMax={yMax || undefined}
      {...{ peakMjd, activeAlertId }}
    />
  );
};

MagnitudeScatterPlotContainer.displayName = "Dynamic.MagnitudeScatterPlot";

export default MagnitudeScatterPlotContainer;
