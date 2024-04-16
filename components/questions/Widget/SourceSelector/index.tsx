import { FunctionComponent, useState } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import SourceSelector from "@rubin-epo/epo-widget-lib/SourceSelector";
import useAlerts from "@/lib/api/hooks/useAlerts";
import WidgetContainerWithModal from "@/components/layout/WidgetContainerWithModal";
import MagnitudeScatterPlotContainer from "@/components/dynamic/LightCurveTool/MagnitudeScatterPlot";
import { WidgetQuestion } from "..";
import * as Styled from "./styles";
import Loader from "@/components/page/Loader";

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
  const staticWidth = 1000;
  const { sourceSelector } = useFragment(Fragment, data);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const [{ url }] = sourceSelector[0]?.dataset[0]?.json;

  const { data: alerts = [], error, isLoading } = useAlerts(url);

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

  const handleRemoveSource = (id: string) => {
    if (selectedSource.includes(id)) {
      onChangeCallback &&
        onChangeCallback({
          selectedSource: selectedSource.filter((v) => v !== id),
        });
    }
  };

  const selectedSources: Array<{ type: string; id: string }> = sources
    .filter(({ id }) => selectedSource.includes(id))
    .map(({ id, type }) => {
      return { id, type };
    });

  const alertsWithImages = alerts.map((alert, i) => {
    const {
      url: { directUrlPreview },
    } = imageAlbum[i];
    const urlWithoutConstraint = directUrlPreview.slice(0, -3);

    return {
      ...alert,
      image: {
        width: staticWidth,
        height: staticWidth,
        url: `${urlWithoutConstraint}${staticWidth}`,
      },
    };
  });

  return (
    <>
      <WidgetContainerWithModal
        title={displayName || title || undefined}
        interactive={false}
        {...{ instructions }}
      >
        <Styled.MultiWidgetContainer>
          {isLoading ? (
            <Loader height="20rem" />
          ) : (
            <>
              <SourceSelector
                alerts={alertsWithImages}
                selectionCallback={(data) =>
                  onChangeCallback && onChangeCallback({ selectedSource: data })
                }
                alertChangeCallback={setActiveAlertIndex}
                width={staticWidth}
                height={staticWidth}
                {...{ sources, selectedSource, activeAlertIndex }}
              />
              {!!includeScatterPlot && (
                <MagnitudeScatterPlotContainer
                  showPlot={selectedSource.length > 0}
                  {...{ alerts, peakMjd, yMin, yMax, activeAlertIndex }}
                />
              )}
            </>
          )}
        </Styled.MultiWidgetContainer>
      </WidgetContainerWithModal>
      <Styled.SelectionList
        sources={selectedSources}
        onRemoveCallback={handleRemoveSource}
      />
    </>
  );
};

SourceSelectorQuestion.displayName = "Questions.Widget.SourceSelector";

export default SourceSelectorQuestion;
