import { FunctionComponent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Blinker } from "@rubin-epo/epo-widget-lib/Atomic";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import {
  Message,
  PointSelector,
} from "@rubin-epo/epo-widget-lib/SourceSelector";
import { MultiselectInput } from "@/types/answers";
import SourceSelectorControls from "./Controls";
import * as Styled from "./styles";

interface SourceSelectorContainerProps {
  images: Array<any>;
  alerts: Array<any>;
  sources: Array<any>;
  onChangeCallback: (value: MultiselectInput) => void;
  onBlinkCallback: (index: number) => void;
  activeAlertIndex: number;
  value?: MultiselectInput;
  className?: string;
  showControls?: boolean;
}

const SourceSelectorContainer: FunctionComponent<
  SourceSelectorContainerProps
> = ({
  images,
  alerts,
  sources,
  onChangeCallback,
  onBlinkCallback,
  activeAlertIndex,
  value = [],
  showControls = false,
}) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState<ReactNode>();
  const { width, height } = images[0];

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
        blinkCallback={onBlinkCallback}
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
