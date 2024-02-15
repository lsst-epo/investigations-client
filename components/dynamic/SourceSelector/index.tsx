import { FunctionComponent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { Blinker } from "@rubin-epo/epo-widget-lib/Atomic";
import useSWR from "swr";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import {
  Message,
  PointSelector,
} from "@rubin-epo/epo-widget-lib/SourceSelector";
import { MultiselectInput } from "@/types/answers";
import SourceSelectorControls from "./Controls";
import * as Styled from "./styles";

export const Fragment = graphql(`
  fragment SourceSelectorEntry on widgets_sourceSelector_Entry {
    id
    title
    displayName
    dataset {
      ... on datasets_supernovaGalaxyObservations_Entry {
        id
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
        galacticLongitude
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
`);

interface SourceSelectorContainerProps {
  data: FragmentType<typeof Fragment>;
  onChangeCallback: (value: MultiselectInput) => void;
  value?: MultiselectInput;
  className?: string;
  showControls?: boolean;
}

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const SourceSelectorContainer: FunctionComponent<
  SourceSelectorContainerProps
> = ({ data, onChangeCallback, value = [], showControls = false }) => {
  const { dataset } = useFragment(Fragment, data);
  const { data: alerts } = useSWR(
    `/api/asset?url=${dataset[0].json[0].url}`,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );
  const { t } = useTranslation();
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState<ReactNode>();
  if (
    dataset.length === 0 ||
    dataset[0] === null ||
    dataset[0].__typename !== "datasets_supernovaGalaxyObservations_Entry"
  )
    return null;

  const { sources, imageAlbum } = dataset[0];
  const { width, height } = imageAlbum[0];

  const images =
    imageAlbum?.map(({ width, height, url: { directUrlOriginal } }) => {
      return { width, height, url: directUrlOriginal };
    }) || [];

  const handleSelectSource = (id?: string) => {
    if (id) {
      const isAlreadySelected = value.includes(id);

      if (!isAlreadySelected) {
        setMessage(
          <>
            <IconComposer icon="checkmark" />
            {t("source_selector.messages.success")}
          </>
        );
        return onChangeCallback && onChangeCallback(value.concat(id));
      }
    } else {
      setMessage(t("source_selector.messages.failure"));
    }
  };

  const handleMessageChange = () => {
    setMessage(undefined);
  };

  return (
    <Styled.SourceSelectorContainer style={{ maxWidth: `${width}px` }}>
      <Blinker
        images={images}
        activeIndex={activeAlertIndex}
        showControls={showControls}
        blinkCallback={(i) => setActiveAlertIndex(i)}
        loadedCallback={() => setIsLoaded(true)}
      />
      <Message
        isVisible={!!message}
        onMessageChangeCallback={handleMessageChange}
      >
        {message}
      </Message>
      {isLoaded && (
        <PointSelector
          onSelectCallback={handleSelectSource}
          selectedSource={value}
          {...{ width, height, sources }}
        />
      )}
      {showControls && alerts && (
        <Styled.ControlsContainer
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <SourceSelectorControls
            selection={value}
            {...{ onChangeCallback, activeAlertIndex, alerts, sources }}
          />
        </Styled.ControlsContainer>
      )}
    </Styled.SourceSelectorContainer>
  );
};

SourceSelectorContainer.displayName = "Container.SourceSelector";

export default SourceSelectorContainer;
