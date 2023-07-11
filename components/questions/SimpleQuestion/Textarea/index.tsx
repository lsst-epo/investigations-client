import { ChangeEvent, FunctionComponent } from "react";
import * as Styled from "./styles";

interface SimpleTextareaProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string) => void;
}

const SimpleTextarea: FunctionComponent<SimpleTextareaProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
}) => {
  return (
    <Styled.Textarea
      id={id}
      disabled={isDisabled}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        onChangeCallback && onChangeCallback(event.target.value)
      }
    >
      {value}
    </Styled.Textarea>
  );
};

SimpleTextarea.displayName = "Questions.Simple.Textarea";

export default SimpleTextarea;
