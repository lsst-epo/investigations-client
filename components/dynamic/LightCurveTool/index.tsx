import { FunctionComponent } from "react";
import { ObservationsPlotWithCurve } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import useSWR from "swr";
import fetcher from "@/lib/api/fetcher";

export interface LightCurveData {
  datasetId?: string;
  gaussianWidth?: number;
  yOffset?: number;
  userMagnitude?: number;
}

interface LightCurveToolContainerProps {
  name?: string;
  data: LightCurveData;
  dataset: { json: Array<{ url: string }>; peakMjd: number };
  onChangeCallback: (value: LightCurveData) => void;
  yMin?: number;
  yMax?: number;
}

const LightCurveToolContainer: FunctionComponent<
  LightCurveToolContainerProps
> = ({ name, data, dataset, onChangeCallback, yMin, yMax }) => {
  const { gaussianWidth, yOffset, userMagnitude } = data;
  const {
    json: [{ url }],
    peakMjd,
  } = dataset;

  const { data: alerts = [] } = useSWR(`/api/asset?url=${url}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
      }}
    />
  );
};

export default LightCurveToolContainer;
