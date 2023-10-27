import { ChangeEvent, FunctionComponent } from "react";
import * as Styled from "./styles";

interface SimpleTextareaProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string) => void;
  labelledById?: string;
}

const SimpleTextarea: FunctionComponent<SimpleTextareaProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  labelledById,
}) => {
  return (
    <Styled.Textarea
      aria-labelledby={labelledById}
      as="textarea"
      rows={3}
      disabled={isDisabled}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        onChangeCallback && onChangeCallback(event.target.value)
      }
      {...{ id, value }}
    />
  );
};

SimpleTextarea.displayName = "Questions.Simple.Textarea";

export default SimpleTextarea;
