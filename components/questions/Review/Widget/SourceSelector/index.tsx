import { FunctionComponent } from "react";
import SourceSelector, {
  MovingSourceSelector,
} from "@rubin-epo/epo-widget-lib/SourceSelector";
import { WidgetReviewProps } from "..";
import { SourceSelectorData } from "@/types/widgets";
import useAlerts from "@/lib/api/hooks/useAlerts";
import {
  combineAlertsAndImages,
  percentageMapSources,
  percentageMapSourcesForMovingSources,
  combineAlertsAndImagesForMovingSources,
} from "@/helpers/widgets";

const SourceSelectorReview: FunctionComponent<
  WidgetReviewProps<any, SourceSelectorData>
> = ({ data, value }) => {
  const { sourceSelector } = data;
  const [{ dataset }] = sourceSelector;
  const [{ sources, json, imageAlbum }] = dataset;
  const { selectedSource = [] } = value || {};

  const hasMovingSource = sourceSelector[0]?.hasMovingSource ?? false;

  const { data: alertData = [], isLoading } = useAlerts(json[0].url);

  const { alerts, size } = hasMovingSource
    ? combineAlertsAndImagesForMovingSources(alertData, imageAlbum || [])
    : combineAlertsAndImages(alertData, imageAlbum || []);

  const percentageMappedSources = hasMovingSource
    ? percentageMapSourcesForMovingSources(sources)
    : percentageMapSources(sources);

  return (
    <>
      {hasMovingSource ? (
        <MovingSourceSelector
          {...{ alerts, selectedSource, isLoading }}
          movingSources={percentageMappedSources}
          width={size}
          height={size}
          isDisplayOnly
        />
      ) : (
        <SourceSelector
          {...{ alerts, selectedSource, isLoading }}
          sources={percentageMappedSources}
          width={size}
          height={size}
          isDisplayOnly
        />
      )}
    </>
  );
};

SourceSelectorReview.displayName = "Review.Widget.SourceSelector";

export default SourceSelectorReview;
