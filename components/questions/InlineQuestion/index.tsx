"use client";
import { ComponentType, FunctionComponent, useContext } from "react";
import { Option } from "@/components/shapes/option";
import { BaseQuestionProps, InlineQuestionType } from "@/types/questions";
import * as Styled from "./styles";
import Readonly from "./Readonly";
import Text from "./Text";
import Select from "./Select";
import Multiselect from "./Multiselect";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import { InlineQuestionData } from "@/types/answers";

interface InlineQuestionPart {
  id: string;
  type: InlineQuestionType;
}

export interface InlineReadonlyPart extends InlineQuestionPart {
  text: string;
}

export type InlineTextPart = InlineQuestionPart;

export interface InlineSelectPart extends InlineQuestionPart {
  options: Option[];
}

export interface InlineMultiselectPart extends InlineQuestionPart {
  options: Option[];
}

export interface InlineQuestionProps extends BaseQuestionProps {
  parts: Array<
    | InlineReadonlyPart
    | InlineTextPart
    | InlineSelectPart
    | InlineMultiselectPart
  >;
}

const INPUT_MAP: Record<InlineQuestionType, ComponentType<any>> = {
  readonlyText: Readonly,
  text: Text,
  select: Select,
  multiselect: Multiselect,
};

const InlineQuestion: FunctionComponent<InlineQuestionProps> = ({
  id,
  isDisabled,
  parts = [],
}) => {
  const { answers, onChangeCallback } = useContext(StoredAnswersContext);
  const storedAnswer = answers[id] || {};
  const { data = {} } = storedAnswer;

  return (
    <Styled.InlineContainer id={id}>
      {parts.map(({ id: partId, type, ...props }) => {
        const Input = INPUT_MAP[type];

        if (!Input) {
          console.error(
            `"${type}" is not a valid input for this question type.`
          );

          return null;
        }

        return (
          <Input
            key={partId}
            id={partId}
            onChangeCallback={(value: string | string[]) =>
              onChangeCallback &&
              onChangeCallback(
                { ...(data as InlineQuestionData), [partId]: value },
                id,
                storedAnswer?.id
              )
            }
            value={(data as InlineQuestionData)[partId]}
            {...{ ...props, isDisabled }}
          />
        );
      })}
    </Styled.InlineContainer>
  );
};

InlineQuestion.displayName = "Questions.Inline";

export default InlineQuestion;
