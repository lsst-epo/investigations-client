import { ChangeEvent, FunctionComponent } from "react";
import * as Styled from "./styles";

interface SimpleTextProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string) => void;
}

const SimpleText: FunctionComponent<SimpleTextProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
}) => {
  return (
    <Styled.TextInput
      id={id}
      type="text"
      disabled={isDisabled}
      defaultValue={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChangeCallback && onChangeCallback(event.target.value)
      }
    />
  );
};

SimpleText.displayName = "Questions.Simple.Text";

export default SimpleText;
