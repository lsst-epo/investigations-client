import { FocusEvent, FunctionComponent } from "react";
import * as Styled from "./styles";

interface SimpleTextProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string) => void;
  labelledById: string;
}

const SimpleText: FunctionComponent<SimpleTextProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  labelledById,
}) => {
  return (
    <Styled.TextInput
      aria-labelledby={labelledById}
      id={id}
      type="text"
      disabled={isDisabled}
      defaultValue={value}
      onBlur={(event: FocusEvent<HTMLInputElement>) =>
        onChangeCallback && onChangeCallback(event.target.value)
      }
    />
  );
};

SimpleText.displayName = "Questions.Simple.Text";

export default SimpleText;
