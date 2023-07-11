import { FunctionComponent } from "react";
import { Option } from "@/components/shapes/option";
import Text from "./Text";
import Textarea from "./Textarea";
import Select from "./Select";
import Multiselect from "./Multiselect";

export interface SimpleQuestionProps {
  id: string;
  number: number;
  type: "text" | "textarea" | "select" | "multiselect";
  questionText: string;
  value?: string | string[];
  options?: Option[];
  isDisabled?: boolean;
}
const inputTypes = {
  text: Text,
  textarea: Textarea,
  select: Select,
  multiselect: Multiselect,
};

const SimpleQuestion: FunctionComponent<SimpleQuestionProps> = ({
  id,
  number,
  type,
  questionText,
  value,
  options,
  isDisabled,
}) => {
  const Input = inputTypes[type];

  if (!Input) {
    console.error(`"${type}" is not a valid input for this question type.`);

    return null;
  }

  const callback = (value: string | string[]) => {
    console.info({ value });
  };

  return (
    <li value={number}>
      <label htmlFor={id}>{questionText}</label>
      <Input
        onChangeCallback={callback}
        {...({ value, isDisabled, id, options } as any)}
      />
    </li>
  );
};

SimpleQuestion.displayName = "Questions.Simple";

export default SimpleQuestion;
