"use client";

import { ComponentType, FunctionComponent, useContext } from "react";
import {
  BaseQuestionProps,
  SimpleQuestionType,
} from "@/components/shapes/questions";
import { Option } from "@/components/shapes/option";

import Text from "./Text";
import Textarea from "./Textarea";
import Select from "./Select";
import Multiselect from "./Multiselect";
import Widget from "./Widget";
import StoredAnswersContext from "@/contexts/StoredAnswers";

export interface SimpleQuestionProps extends BaseQuestionProps {
  type: SimpleQuestionType;
  questionText: string;
  widgetConfig?: { type: "filterTool"; [key: string]: any };
  options?: Option[];
}

const INPUT_MAP: Record<SimpleQuestionType, ComponentType<any>> = {
  text: Text,
  textarea: Textarea,
  select: Select,
  multiselect: Multiselect,
  widget: Widget,
};

const SimpleQuestion: FunctionComponent<SimpleQuestionProps> = ({
  id,
  number,
  type,
  questionText,
  options,
  isDisabled,
  widgetConfig,
}) => {
  const { answers, onChangeCallback } = useContext(StoredAnswersContext);

  const storedAnswer = answers[id];

  const Input = INPUT_MAP[type];

  if (!Input) {
    console.error(`"${type}" is not a valid input for this question type.`);

    return null;
  }

  return (
    <li value={number}>
      <label htmlFor={id}>{questionText}</label>
      <Input
        onChangeCallback={(value: HTMLInputElement["value"]) =>
          onChangeCallback && onChangeCallback(value, id)
        }
        {...{
          value: storedAnswer?.data,
          isDisabled,
          id,
          options,
          widgetConfig,
        }}
      />
    </li>
  );
};

SimpleQuestion.displayName = "Questions.Simple";

export default SimpleQuestion;
