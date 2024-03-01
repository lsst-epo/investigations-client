import { FunctionComponent } from "react";
import useSWR from "swr";
import SourceSelector from "@rubin-epo/epo-widget-lib/SourceSelector";
import fetcher from "@/lib/api/fetcher";
import { WidgetReviewProps } from "..";
import { SourceSelectorData } from "@/types/widgets";

const SourceSelectorReview: FunctionComponent<
  WidgetReviewProps<any, SourceSelectorData>
> = ({ data, value }) => {
  const { sourceSelector } = data;
  const [{ dataset }] = sourceSelector;
  const [{ sources, json, imageAlbum }] = dataset;
  const { selectedSource = [] } = value || {};

  const {
    data: alertData = [],
    error,
    isLoading,
  } = useSWR(`/api/asset?url=${json[0].url}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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
