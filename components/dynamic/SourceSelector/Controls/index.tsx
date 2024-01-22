import { FunctionComponent } from "react";
import * as Styled from "./styles";
import { MultiselectInput } from "@/types/answers";

interface SourceSelectorControlsProps {
  sources: Array<any>;
  alerts: Array<any>;
  selection: MultiselectInput;
  activeAlertIndex: number;
  onChangeCallback: (value: MultiselectInput) => void;
}

const SourceSelectorControls: FunctionComponent<
  SourceSelectorControlsProps
> = ({ sources, alerts, selection, activeAlertIndex, onChangeCallback }) => {
  const handleRemoveSource = (id: string) => {
    if (selection.includes(id)) {
      onChangeCallback && onChangeCallback(selection.filter((v) => v !== id));
    }
  };

  const selectedSources: Array<{ type: string; id: string }> = sources
    .filter(({ id }) => selection.includes(id))
    .map(({ id, type }) => {
      return { id, type };
    });

  const currentAlert = alerts[activeAlertIndex];
  const diff = currentAlert.date - alerts[0].date;
  const day = Math.round(diff);
  const hour = Math.round((24 / diff) % 24) || 0;

  return (
    <Styled.ModalControls>
      <Styled.SelectionList
        sources={selectedSources}
        onRemoveCallback={handleRemoveSource}
      />
      <Styled.ElapsedTime {...{ day, hour }} />
    </Styled.ModalControls>
  );
};

export default SourceSelectorControls;
