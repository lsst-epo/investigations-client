import { FunctionComponent } from "react";
import SourceSelector from "@rubin-epo/epo-widget-lib/SourceSelector";
import { WidgetReviewProps } from "..";
import { SourceSelectorData } from "@/types/widgets";
import useAlerts from "@/lib/api/hooks/useAlerts";
import {
  combineAlertsAndImages,
  percentageMapSources,
} from "@/helpers/widgets";

const SourceSelectorReview: FunctionComponent<
  WidgetReviewProps<any, SourceSelectorData>
> = ({ data, value }) => {
  const { sourceSelector } = data;
  const [{ dataset }] = sourceSelector;
  const [{ sources, json, imageAlbum }] = dataset;
  const { selectedSource = [] } = value || {};

  const { data: alertData = [], isLoading } = useAlerts(json[0].url);

  const { alerts, size } = combineAlertsAndImages(alertData, imageAlbum || []);

  const percentageMappedSources = percentageMapSources(sources);

  return (
    <SourceSelector
      {...{ alerts, selectedSource, isLoading }}
      sources={percentageMappedSources}
      width={size}
      height={size}
      isDisplayOnly
    />
  );
};

SourceSelectorReview.displayName = "Review.Widget.SourceSelector";

export default SourceSelectorReview;
