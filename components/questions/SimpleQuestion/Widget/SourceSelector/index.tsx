import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import fetcher from "@/lib/api/fetcher";
import { SimpleWidgetProps } from "..";
import { BaseContentBlockProps } from "@/components/shapes";
import WidgetContainer from "@/components/layout/WidgetContainer";
import withModal from "@/components/hoc/withModal/withModal";
import SourceSelectorContainer from "@/components/dynamic/SourceSelector";
import { ObservationsPlot } from "@rubin-epo/epo-widget-lib/LightCurvePlot";
import * as Styled from "./styles";
import Loader from "@/components/page/Loader";

const Fragment = graphql(`
  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {
    __typename
    typeHandle
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

export interface SourceSelectorValue {
  selectedSource: Array<string>;
}

type SourceSelectorQuestionProps = Omit<
  SimpleWidgetProps<SourceSelectorValue>,
  "widgetConfig"
> &
  BaseContentBlockProps<FragmentType<typeof Fragment>>;

const SourceSelectorQuestion: FunctionComponent<
  SourceSelectorQuestionProps
> = ({ data, onChangeCallback, value, isOpen, openModal, questionText }) => {
  const { t } = useTranslation();
  const { sourceSelector } = useFragment(Fragment, data);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [{ title, displayName, dataset, includeScatterPlot, yMin, yMax }] =
    sourceSelector;
  const [{ sources, json, imageAlbum, peakMjd }] = dataset;
  const { selectedSource = [] } = value || {};

  const {
    data: alerts = [],
    error,
    isLoading,
  } = useSWR(`/api/asset?url=${json[0].url}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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

  return (
    <>
      <WidgetContainer
        data-modal-open={isOpen}
        title={displayName || title || undefined}
        interactive={false}
        instructions={questionText}
        {...{ openModal, isOpen }}
      >
        {isLoading ? (
          <Loader height="25rem" />
        ) : (
          <Styled.MultiWidgetContainer>
            <SourceSelectorContainer
              onChangeCallback={(selectedSource) =>
                onChangeCallback && onChangeCallback({ selectedSource })
              }
              onBlinkCallback={(index) => setActiveAlertIndex(index)}
              showControls={isOpen}
              value={selectedSource}
              {...{ images, sources, alerts, activeAlertIndex }}
            />
            {!!includeScatterPlot && (
              <ObservationsPlot
                activeAlertId={isOpen ? alerts[activeAlertIndex].id : undefined}
                name={t("widgets.light_curve") || undefined}
                {...{ alerts, peakMjd, yMin, yMax }}
              />
            )}
          </Styled.MultiWidgetContainer>
        )}
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

SourceSelectorQuestion.displayName = "Questions.Simple.Widget.SourceSelector";

export default withModal(SourceSelectorQuestion);
