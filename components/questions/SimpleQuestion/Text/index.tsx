import { FocusEvent, FunctionComponent } from "react";
import QuestionInput from "@/components/form/Input/patterns/Question";

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
    <QuestionInput
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
