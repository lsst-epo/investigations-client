"use client";
import { ComponentType, FunctionComponent, useContext } from "react";
import { BaseQuestionProps, SimpleQuestionType } from "@/types/questions";
import { Option } from "@/components/shapes/option";

import Text from "./Text";
import Textarea from "./Textarea";
import Select from "./Select";
import Widget from "./Widget";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import QuestionNumber from "../QuestionNumber";
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
  widget: Widget,
};

const SimpleQuestion: FunctionComponent<SimpleQuestionProps> = ({
  id,
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
    <QuestionNumber id={id}>
      {type === "widget" ? (
        <Styled.QuestionLabel
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
        {...{
          isDisabled,
          id,
          options,
          widgetConfig,
          questionText,
        }}
      />
    </QuestionNumber>
  );
};

SimpleQuestion.displayName = "Questions.Simple";

export default SimpleQuestion;
