import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { PointSelector } from "@rubin-epo/epo-widget-lib/SourceSelector";
import { Blinker } from "@rubin-epo/epo-widget-lib/Atomic";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { MultiselectInput } from "@/types/answers";
import SourceSelectorControls from "./Controls";
import Toaster from "./Toaster";
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
        alerts {
          ... on alerts_alert_BlockType {
            error: errorMagnitude
            magnitude
            date: modifiedJulianDate
            id: observationId
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

const SourceSelectorContainer: FunctionComponent<
  SourceSelectorContainerProps
> = ({ data, onChangeCallback, value = [], showControls = false }) => {
  const { t } = useTranslation();
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { dataset } = useFragment(Fragment, data);

  if (
    dataset.length === 0 ||
    dataset[0] === null ||
    dataset[0].__typename !== "datasets_supernovaGalaxyObservations_Entry"
  )
    return null;

  const { sources, alerts, imageAlbum } = dataset[0];
  const { width, height } = imageAlbum[0];

  const images =
    imageAlbum?.map(({ width, height, url: { directUrlOriginal } }) => {
      return { width, height, url: directUrlOriginal };
    }) || [];

  const handleSelectSource = (id?: string) => {
    if (id) {
      const isAlreadySelected = value.includes(id);

      if (!isAlreadySelected) {
        toast(t("source_selector.messages.success"), { id: "sourceSelector" });
        return onChangeCallback && onChangeCallback(value.concat(id));
      }
    } else {
      toast(t("source_selector.messages.failure"), {
        icon: undefined,
        id: "sourceSelector",
      });
    }
  };

  return (
    <Styled.SourceSelectorContainer>
      <Blinker
        images={images}
        activeIndex={activeAlertIndex}
        showControls={showControls}
        blinkCallback={(i) => setActiveAlertIndex(i)}
        loadedCallback={() => setIsLoaded(true)}
      />
      <Toaster />
      {isLoaded && (
        <PointSelector
          onSelectCallback={handleSelectSource}
          selectedSource={value}
          {...{ width, height, sources }}
        />
      )}
      {showControls && (
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
