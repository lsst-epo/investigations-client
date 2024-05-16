import { FunctionComponent } from "react";
import { WidgetReviewProps } from "..";
import { getDataset } from "@/helpers/widgets";
import IsochronePlotContainer from "@/components/dynamic/IsochronePlot";

const IsochronePlotReview: FunctionComponent<WidgetReviewProps> = ({
  data: { dataset },
  value = {},
}) => {
  const { datasetId } = value;

  const plot = getDataset(dataset, datasetId);

  if (plot) {
    const { xMin, xMax, yMin, yMax, ageLibrary, plotPoints } = plot;

    const xAxis = { min: xMin, max: xMax };
    const yAxis = { min: yMin, max: yMax };

    const isochroneUrl = ageLibrary[0]?.url;
    const pointsUrl = plotPoints[0]?.url;

    if (!isochroneUrl || !pointsUrl) return null;
    return (
      <IsochronePlotContainer
        sources={{
          points: pointsUrl,
          isochrones: isochroneUrl,
        }}
        {...{ value, xAxis, yAxis }}
        isDisplayOnly
      />
    );
  }

  return null;
};

export default IsochronePlotReview;
