import { FocusEvent, FunctionComponent } from "react";
import * as Styled from "./styles";

interface SimpleTextProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string) => void;
  className?: string;
}

const SimpleText: FunctionComponent<SimpleTextProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  className,
}) => {
  return (
    <Styled.TextInput
      {...{ id, className }}
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
