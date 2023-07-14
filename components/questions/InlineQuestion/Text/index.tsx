import { FunctionComponent, ChangeEvent } from "react";
import { InlineTextPart } from "..";
import * as Styled from "./styles";

interface InlineTextProps extends InlineTextPart {
  onChangeCallback: (value: string, id: string) => void;
  isDisabled?: boolean;
  value?: string;
}

const InlineText: FunctionComponent<InlineTextProps> = ({
  onChangeCallback,
  isDisabled,
  value,
  id,
}) => (
  <Styled.InlineTextInput
    type="text"
    disabled={isDisabled}
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>) =>
      onChangeCallback && onChangeCallback(event.target.value, id)
    }
  />
);

InlineText.displayName = "Questions.Inline.Text";

export default InlineText;
