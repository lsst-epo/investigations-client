import { FunctionComponent } from "react";
import { InlineMultiselectPart } from "..";
import * as Styled from "../Select/styles";

interface InlineSelectProps extends InlineMultiselectPart {
  onChangeCallback: (value: string[] | null, id: string) => void;
  isDisabled?: boolean;
  value: string[];
}

const InlineMultiselect: FunctionComponent<InlineSelectProps> = ({
  onChangeCallback,
  isDisabled,
  options,
  value,
  id,
}) => (
  <Styled.InlineSelect
    isMultiselect={true}
    {...{ isDisabled, options, value }}
    onChangeCallback={(value: string[] | null) =>
      onChangeCallback && onChangeCallback(value, id)
    }
  />
);

InlineMultiselect.displayName = "Questions.Inline.Multiselect";

export default InlineMultiselect;
