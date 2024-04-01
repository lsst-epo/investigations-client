import { FunctionComponent, useState } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import ModalProps from "@/components/shapes/modal";
import WidgetContainer from "@/components/layout/WidgetContainer";
import withModal from "@/components/hoc/withModal/withModal";
import SourceSelectorContainer from "@/components/dynamic/SourceSelector";
import MagnitudeScatterPlotContainer from "@/components/dynamic/LightCurveTool/MagnitudeScatterPlot";
import { WidgetQuestion } from "..";
import * as Styled from "./styles";

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
                directUrlOriginal
              }
              width
              height
            }
          }
        }
      }
    }
  }
`);

type SourceSelectorQuestionProps = WidgetQuestion<
  FragmentType<typeof Fragment>
> &
  ModalProps;

const SourceSelectorQuestion: FunctionComponent<
  SourceSelectorQuestionProps
> = ({ data, onChangeCallback, value, isOpen, openModal, instructions }) => {
  const { sourceSelector } = useFragment(Fragment, data);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

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

  const [{ sources, json, imageAlbum, peakMjd }] = dataset;
  const { selectedSource = [] } = value || {};

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

  const images =
    imageAlbum?.map(({ width, height, url: { directUrlOriginal } }) => {
      return { width, height, url: directUrlOriginal };
    }) || [];

  const alertsAssetUrl = json[0]?.url || undefined;

  return (
    <>
      <WidgetContainer
        data-modal-open={isOpen}
        title={displayName || title || undefined}
        interactive={false}
        {...{ openModal, isOpen, instructions }}
      >
        <Styled.MultiWidgetContainer>
          <SourceSelectorContainer
            onChangeCallback={(selectedSource) =>
              onChangeCallback && onChangeCallback({ selectedSource })
            }
            onBlinkCallback={(index) => setActiveAlertIndex(index)}
            showControls={isOpen}
            value={selectedSource}
            url={alertsAssetUrl}
            {...{ images, sources, activeAlertIndex }}
          />
          {!!includeScatterPlot && (
            <MagnitudeScatterPlotContainer
              url={alertsAssetUrl}
              showPlot={selectedSource.length > 0}
              activeAlertIndex={isOpen ? activeAlertIndex : undefined}
              {...{ peakMjd, yMin, yMax }}
            />
          )}
        </Styled.MultiWidgetContainer>
      </WidgetContainer>
      {!isOpen && (
        <Styled.SelectionList
          sources={selectedSources}
          onRemoveCallback={handleRemoveSource}
        />
      )}
    </>
  );
};

SourceSelectorQuestion.displayName = "Questions.Widget.SourceSelector";

export default withModal(SourceSelectorQuestion);
