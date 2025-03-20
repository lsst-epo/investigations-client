import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { ObservationsPlot } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import { useTranslation } from "@/lib/i18n/server";
import tags from "@/lib/tags";

const Fragment = graphql(`
  fragment MagnitudeScatterPlotBlock on contentBlocks_magnitudeScatterPlot_BlockType {
    lightCurveTool {
      ... on widgets_lightCurveTool_Entry {
        displayName
        dataset {
          ... on datasets_supernovaGalaxyObservations_Entry {
            title
            peakMjd: mjd
            json {
              ... on datasets_Asset {
                url
              }
            }
          }
        }
        yMin: yAxisMin
        yMax: yAxisMax
      }
    }
  }
`);

const getDataset = async (url?: string): Promise<Array<string>> => {
  if (url) {
    const response = await fetch(url, {
      next: { tags: [tags.datasets] },
    });
    return await response.json();
  } else {
    return [];
  }
};

const MagnitudeScatterPlotBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = async ({ data, locale }) => {
  const { t } = await useTranslation(locale, "translation");
  const { lightCurveTool } = useFragment(Fragment, data);

  if (
    lightCurveTool === null ||
    lightCurveTool[0] === null ||
    lightCurveTool[0].__typename !== "widgets_lightCurveTool_Entry"
  )
    return null;

  const [{ displayName, dataset, yMin, yMax }] = lightCurveTool;

  if (
    dataset === null ||
    dataset[0] === null ||
    dataset[0].__typename !== "datasets_supernovaGalaxyObservations_Entry"
  )
    return null;

  const [{ peakMjd, json, title }] = dataset;

  const alerts = await getDataset(json[0]?.url || undefined);

  return (
    <WidgetContainerWithModal title={t("widgets.light_curve.title")}>
      <ObservationsPlot
        name={displayName || title || undefined}
        {...{ alerts, peakMjd, yMin, yMax }}
      />
    </WidgetContainerWithModal>
  );
};

MagnitudeScatterPlotBlock.displayName = "ContentBlock.MagnitudeScatterPlot";

export default MagnitudeScatterPlotBlock;
