import { FunctionComponent, useState } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import SourceSelector, {
  SelectionList,
  MovingSourceSelector
} from "@rubin-epo/epo-widget-lib/SourceSelector";
import useAlerts from "@/lib/api/hooks/useAlerts";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import MagnitudeScatterPlotContainer from "@/components/dynamic/LightCurveTool/MagnitudeScatterPlot";
import { WidgetQuestion } from "..";
import {
  combineAlertsAndImages,
  percentageMapSources,
  percentageMapSourcesForMovingSources,
  combineAlertsAndImagesForMovingSources
} from "@/helpers/widgets";

const Fragment = graphql(`
  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {
    __typename
    sourceSelector {
      ... on widgets_sourceSelector_Entry {
        id
        title
        displayName
        includeScatterPlot
        yMin: yAxisMin
        yMax: yAxisMax
        hasMovingSource
        dataset {
          ... on datasets_supernovaGalaxyObservations_Entry {
            id
            peakMjd: mjd
            sources: alertSources {
              ... on alertSources_source_BlockType {
                color
                x: xCoord
                y: yCoord
                radius
                type: sourceType
                id: sourceName
              }
            }
            json {
              ... on datasets_Asset {
                url
              }
            }
            imageAlbum {
              name
              url {
                directUrlPreview
              }
            }
          }
        }
      }
    }
  }
`);

type SourceSelectorQuestionProps = WidgetQuestion<
  FragmentType<typeof Fragment>
>;

const SourceSelectorQuestion: FunctionComponent<
  SourceSelectorQuestionProps
> = ({ data, onChangeCallback, value = {}, instructions }) => {
  const { sourceSelector } = useFragment(Fragment, data);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const [{ url }] = sourceSelector[0]?.dataset[0]?.json;

  const hasMovingSource = sourceSelector[0]?.hasMovingSource ?? false;

  const { data: alerts = [], isLoading } = useAlerts(url);

  if (
    sourceSelector === null ||
    sourceSelector[0] === null ||
    sourceSelector[0].__typename !== "widgets_sourceSelector_Entry"
  )
    return null;

  const [{ title, displayName, dataset, includeScatterPlot, yMin, yMax }] =
    sourceSelector;

  if (
    dataset === null ||
    dataset[0] === null ||
    dataset[0].__typename !== "datasets_supernovaGalaxyObservations_Entry"
  )
    return null;

  const [{ sources, imageAlbum, peakMjd }] = dataset;
  const { selectedSource = [] } = value;

  const handleRemoveSource = () => {
    onChangeCallback &&
      onChangeCallback({
        selectedSource: [],
      });
  };

  const percentageMappedSources = hasMovingSource ? percentageMapSourcesForMovingSources(sources) : percentageMapSources(sources);
  const selectedSources: Array<{ type: string; id: string }> = sources
    .filter(({ id }) => selectedSource.includes(id))
    .map(({ id, type }) => {
      return { id, type };
    }).filter((obj, index, self) => index === self.findIndex((t) => t.id === obj.id));

  const { alerts: alertsWithImages, size } = hasMovingSource ? combineAlertsAndImagesForMovingSources(alerts,
                                                                imageAlbum || []) : combineAlertsAndImages(
                                                                alerts,
                                                                imageAlbum || []
  );
  return (
    <>
      <WidgetContainerWithModal
        title={displayName || title || undefined}
        caption={
          <SelectionList
            sources={selectedSources}
            onRemoveCallback={handleRemoveSource}
          />
        }
        {...{ instructions }}
      >
        <>
        {hasMovingSource ? (
          <MovingSourceSelector
            alerts={alerts}
            selectionCallback={(data) =>
              onChangeCallback && onChangeCallback({ selectedSource: data })
            }
            alertChangeCallback={setActiveAlertIndex}
            width={size}
            height={size}
            movingSources={percentageMappedSources}
            {...{ selectedSource, activeAlertIndex, isLoading }}
          >

          </MovingSourceSelector>
        ) : (
          <>
          <SourceSelector
            alerts={alertsWithImages}
            selectionCallback={(data) =>
              onChangeCallback && onChangeCallback({ selectedSource: data })
            }
            alertChangeCallback={setActiveAlertIndex}
            width={size}
            height={size}
            sources={percentageMappedSources}
            {...{ selectedSource, activeAlertIndex, isLoading }}
          />
          {!!includeScatterPlot && (
            <MagnitudeScatterPlotContainer
              showPlot={selectedSource.length > 0}
              {...{ alerts, peakMjd, yMin, yMax, activeAlertIndex }}
            />
          )}
          </>
          )}
        </>
      </WidgetContainerWithModal>
    </>
  );
};

SourceSelectorQuestion.displayName = "Questions.Widget.SourceSelector";

export default SourceSelectorQuestion;
