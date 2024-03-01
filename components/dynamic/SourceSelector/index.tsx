import { FunctionComponent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Blinker } from "@rubin-epo/epo-widget-lib/Atomic";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import {
  Message,
  PointSelector,
} from "@rubin-epo/epo-widget-lib/SourceSelector";
import useAlerts from "@/lib/api/hooks/useAlerts";
import { MultiselectInput } from "@/types/answers";
import SourceSelectorControls from "./Controls";
import * as Styled from "./styles";

interface SourceSelectorProps {
  images: Array<any>;
  sources: Array<any>;
  onChangeCallback: (value: MultiselectInput) => void;
  onBlinkCallback: (index: number) => void;
  activeAlertIndex: number;
  value?: MultiselectInput;
  className?: string;
  showControls?: boolean;
  url?: string;
}

const SourceSelector: FunctionComponent<SourceSelectorProps> = ({
  images,
  sources,
  onChangeCallback,
  onBlinkCallback,
  activeAlertIndex,
  value = [],
  url,
  showControls = false,
}) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState<ReactNode>();
  const { width, height } = images[0];

  const { data: alerts = [], error, isLoading } = useAlerts(url);

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
        activeIndex={activeAlertIndex}
        blinkCallback={onBlinkCallback}
        loadedCallback={() => setIsLoaded(true)}
        {...{ images, showControls }}
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
      {showControls && !isLoading && (
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

SourceSelector.displayName = "Dynamic.SourceSelector";

export default SourceSelector;
