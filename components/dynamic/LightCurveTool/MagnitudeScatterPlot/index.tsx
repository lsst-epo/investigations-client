import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ObservationsPlot } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import useAlerts from "@/lib/api/hooks/useAlerts";

interface MagnitudeScatterPlotProps {
  activeAlertIndex?: number;
  peakMjd: number;
  url?: string;
  yMin?: number;
  yMax?: number;
  showPlot?: boolean;
}

const MagnitudeScatterPlotContainer: FunctionComponent<
  MagnitudeScatterPlotProps
> = ({ activeAlertIndex, peakMjd, yMin, yMax, url, showPlot = true }) => {
  const { t } = useTranslation();

  const { data: alerts = [], error, isLoading } = useAlerts(url);

  const activeAlertId =
    typeof activeAlertIndex === "number"
      ? alerts[activeAlertIndex].id
      : undefined;

  return (
    <ObservationsPlot
      name={t("widgets.light_curve.title") || undefined}
      alerts={showPlot && !isLoading && !error ? alerts : []}
      {...{ peakMjd, yMin, yMax, activeAlertId }}
    />
  );
};

MagnitudeScatterPlotContainer.displayName = "Dynamic.MagnitudeScatterPlot";

export default MagnitudeScatterPlotContainer;
