import { FunctionComponent } from "react";
import { WidgetReviewProps } from "..";
import { LightCurveData } from "@/types/widgets";
import LightCurveToolContainer from "@/components/dynamic/LightCurveTool/LightCurvePlot";

const LightCurveReview: FunctionComponent<
  WidgetReviewProps<any, LightCurveData>
> = ({ data, value = {} }) => {
  const { lightCurveTool } = data;
  const [{ dataset: datasets, title, yMin, yMax }] = lightCurveTool;
  const { datasetId } = value;

  const dataset = datasets.find(({ id }) => id === datasetId);

  // SSR first pass does not have the answer values and errors if not excepted
  if (typeof dataset === "undefined") {
    return null;
  }

  return (
    <LightCurveToolContainer
      name={title}
      data={value}
      dataset={dataset || {}}
      onChangeCallback={() => undefined}
      yMin={yMin || undefined}
      yMax={yMax || undefined}
      isDisplayOnly
    />
  );
};

LightCurveReview.displayName = "Review.Widget.SourceSelector";

export default LightCurveReview;
