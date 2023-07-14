import { FunctionComponent } from "react";
import { InlineSelectPart } from "..";
import * as Styled from "./styles";

interface InlineSelectProps extends InlineSelectPart {
  onChangeCallback: (value: string | null, id: string) => void;
  isDisabled?: boolean;
  value: string;
}

const InlineSelect: FunctionComponent<InlineSelectProps> = ({
  onChangeCallback,
  isDisabled,
  options,
  value,
  id,
}) => (
  <Styled.InlineSelect
    {...{ isDisabled, onChangeCallback, options, value }}
    onChangeCallback={(value: string | null) =>
      onChangeCallback && onChangeCallback(value, id)
    }
  />
);

InlineSelect.displayName = "Questions.Inline.Select";

export default InlineSelect;
