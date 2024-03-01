import { FunctionComponent } from "react";
import SourceSelector from "@rubin-epo/epo-widget-lib/SourceSelector";
import { WidgetReviewProps } from "..";
import { SourceSelectorData } from "@/types/widgets";
import useAlerts from "@/lib/api/hooks/useAlerts";

const SourceSelectorReview: FunctionComponent<
  WidgetReviewProps<any, SourceSelectorData>
> = ({ data, value }) => {
  const { sourceSelector } = data;
  const [{ dataset }] = sourceSelector;
  const [{ sources, json, imageAlbum }] = dataset;
  const { selectedSource = [] } = value || {};

  const { data: alertData = [], error, isLoading } = useAlerts(json[0].url);

  if (isLoading) return null;

  const alerts = alertData.map((d, i) => {
    const {
      width,
      height,
      url: { directUrlOriginal },
    } = imageAlbum[i];

    return { ...d, image: { width, height, url: directUrlOriginal } };
  });

  const [{ width, height }] = imageAlbum;

  return (
    <SourceSelector
      {...{ sources, alerts, width, height, selectedSource }}
      isDisplayOnly
    />
  );
};

SourceSelectorReview.displayName = "Review.Widget.SourceSelector";

export default SourceSelectorReview;
