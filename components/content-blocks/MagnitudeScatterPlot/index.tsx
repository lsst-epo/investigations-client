import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { ObservationsPlot } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import { useTranslation } from "@/lib/i18n";

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

  const response = await fetch(json[0]?.url, { next: { tags: ["datasets"] } });
  const alerts = await response.json();

  return (
    <WidgetContainerWithModal
      title={t("widgets.light_curve") || undefined}
      interactive={false}
    >
      <ObservationsPlot
        name={displayName || title || undefined}
        {...{ alerts, peakMjd, yMin, yMax }}
      />
    </WidgetContainerWithModal>
  );
};

MagnitudeScatterPlotBlock.displayName = "ContentBlock.MagnitudeScatterPlot";

export default MagnitudeScatterPlotBlock;
