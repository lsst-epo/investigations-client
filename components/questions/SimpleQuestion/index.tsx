"use client";

import { ComponentType, FunctionComponent, useContext } from "react";
import { BaseQuestionProps, SimpleQuestionType } from "@/types/questions";
import { Option } from "@/components/shapes/option";

import Text from "./Text";
import Textarea from "./Textarea";
import Select from "./Select";
import Multiselect from "./Multiselect";
import Widget from "./Widget";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import * as Styled from "./styles";

export interface SimpleQuestionProps extends BaseQuestionProps {
  type: SimpleQuestionType;
  questionText: string;
  widgetConfig?: { typeHandle: string; __typename: string; [key: string]: any };
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
  const labelId = `${id}Label`;

  const Input = INPUT_MAP[type];

  if (!Input) {
    console.error(`"${type}" is not a valid input for this question type.`);

    return null;
  }

  return (
    <Styled.SimpleContainer value={number}>
      {type === "widget" ? (
        <Styled.QuestionLabel
          id={labelId}
          dangerouslySetInnerHTML={{ __html: questionText }}
        />
      ) : (
        <label htmlFor={id}>{questionText}</label>
      )}
      <Input
        onChangeCallback={(value: any) =>
          onChangeCallback && onChangeCallback(value, id, storedAnswer?.id)
        }
        value={storedAnswer?.data}
        labelledById={labelId}
        {...{
          isDisabled,
          id,
          options,
          widgetConfig,
        }}
      />
    </Styled.SimpleContainer>
  );
};

SimpleQuestion.displayName = "Questions.Simple";

export default SimpleQuestion;
