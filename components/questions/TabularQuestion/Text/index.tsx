import { FunctionComponent, ChangeEvent } from "react";
import { TextCell } from "..";
import * as Styled from "./styles";

interface TextCellProps extends TextCell {
  onChangeCallback: (value: string, id: string) => void;
  isDisabled?: boolean;
  value?: string;
}

const TextQuestionCell: FunctionComponent<TextCellProps> = ({
  onChangeCallback,
  isDisabled,
  value,
  id,
}) => {
  return (
    <Styled.TextInput
      type="text"
      disabled={isDisabled}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        onChangeCallback && onChangeCallback(event.target.value, id)
      }
    />
  );
};

TextQuestionCell.displayName = "Questions.Tabular.Text";

export default TextQuestionCell;
