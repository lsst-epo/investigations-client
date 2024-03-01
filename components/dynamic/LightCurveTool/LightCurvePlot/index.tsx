import { FunctionComponent } from "react";
import { ObservationsPlotWithCurve } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import { LightCurveData } from "@/types/widgets";
import useAlerts from "@/lib/api/hooks/useAlerts";

interface LightCurveGraphProps {
  name?: string;
  data?: LightCurveData;
  dataset: { json: Array<{ url: string }>; peakMjd: number };
  onChangeCallback: (value: LightCurveData) => void;
  yMin?: number;
  yMax?: number;
  isDisplayOnly?: boolean;
}

const LightCurveGraphContainer: FunctionComponent<LightCurveGraphProps> = ({
  name,
  data = {},
  dataset,
  onChangeCallback,
  yMin,
  yMax,
  isDisplayOnly,
}) => {
  const { gaussianWidth, yOffset, userMagnitude } = data;
  const {
    json: [{ url }],
    peakMjd,
  } = dataset;

  const { data: alerts = [] } = useAlerts(url);

  return (
    <ObservationsPlotWithCurve
      onGaussianChangeCallback={(gaussianWidth) =>
        onChangeCallback({ gaussianWidth })
      }
      onUserMagnitudeChangeCallback={(userMagnitude) =>
        onChangeCallback({ userMagnitude })
      }
      onYOffsetChangeCallback={(yOffset) => onChangeCallback({ yOffset })}
      {...{
        name,
        alerts,
        peakMjd,
        gaussianWidth,
        yOffset,
        userMagnitude,
        yMin,
        yMax,
        isDisplayOnly,
      }}
    />
  );
};

LightCurveGraphContainer.displayName = "Dynamic.LightCurveGraph";

export default LightCurveGraphContainer;
