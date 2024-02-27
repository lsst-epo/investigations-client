import { FunctionComponent, useState } from "react";
import useSWR from "swr";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import fetcher from "@/lib/api/fetcher";
import { SimpleWidgetProps } from "..";
import { BaseContentBlockProps } from "@/components/shapes";
import { MultiselectInput } from "@/types/answers";
import WidgetContainer from "@/components/layout/WidgetContainer";
import withModal from "@/components/hoc/withModal/withModal";
import SourceSelectorContainer from "@/components/dynamic/SourceSelector";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment SourceSelectorQuestion on questionWidgetsBlock_sourceSelectorBlock_BlockType {
    __typename
    sourceSelector {
      ... on widgets_sourceSelector_Entry {
        id
        title
        displayName
        includeLightCurve
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

type SourceSelectorQuestionProps = Omit<
  SimpleWidgetProps<MultiselectInput>,
  "widgetConfig"
> &
  BaseContentBlockProps<FragmentType<typeof Fragment>>;

const SourceSelectorQuestion: FunctionComponent<
  SourceSelectorQuestionProps
> = ({
  data,
  onChangeCallback,
  value = [],
  isOpen,
  openModal,
  questionText,
}) => {
  const { sourceSelector } = useFragment(Fragment, data);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [{ title, displayName, dataset, includeLightCurve }] = sourceSelector;
  const [{ sources, json, imageAlbum, peakMjd }] = dataset;

  const {
    data: alerts,
    error,
    isLoading,
  } = useSWR(`/api/asset?url=${json[0].url}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleRemoveSource = (id: string) => {
    if (value.includes(id)) {
      onChangeCallback && onChangeCallback(value.filter((v) => v !== id));
    }
  };

  const selectedSources: Array<{ type: string; id: string }> = sources
    .filter(({ id }) => value.includes(id))
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
        {!isLoading && (
          <Styled.MultiWidgetContainer>
            <SourceSelectorContainer
              onChangeCallback={(value) =>
                onChangeCallback && onChangeCallback(value)
              }
              onBlinkCallback={(index) => setActiveAlertIndex(index)}
              showControls={isOpen}
              {...{ value, images, sources, alerts, activeAlertIndex }}
            />
            {!!includeLightCurve && (
              <Styled.LightCurvePlot
                alerts={value && value.length > 0 ? alerts : undefined}
                activeAlertIndex={isOpen ? activeAlertIndex : undefined}
                {...{ peakMjd }}
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
