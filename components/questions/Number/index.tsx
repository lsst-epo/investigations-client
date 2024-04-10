"use client";
import { FocusEventHandler, FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { NumberInput } from "@/types/answers";
import QuestionNumber from "@/components/questions/QuestionNumber";
import QuestionInput from "@/components/form/Input/patterns/Question";
import useAnswer from "@/hooks/useAnswer";
import useValidation from "@/hooks/useValidation";

const Fragment = graphql(`
  fragment NumberQuestion on questions_default_Entry {
    __typename
    id
    questionText
    minimum
    maximum
    precision
    validation {
      ... on validation_numberValidator_BlockType {
        id
      }
    }
  }
`);

export interface NumberProps {
  data: FragmentType<typeof Fragment>;
  id: string;
  locale: string;
}

const NumberQuestion: FunctionComponent<NumberProps> = ({
  data,
  id,
  locale,
}) => {
  const { questionText, minimum, maximum, precision, validation } = useFragment(
    Fragment,
    data
  );
  const { answer, onChangeCallback } = useAnswer<NumberInput>(id);
  const runValidation = useValidation(
    validation && validation.length > 0 ? id : undefined,
    locale
  );

  const step = 10 ** -parseFloat(precision);

  const handleChange: FocusEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    runValidation && runValidation(value);
    onChangeCallback && onChangeCallback(parseFloat(value));
  };

  return (
    <QuestionNumber id={id}>
      <label htmlFor={id}>{questionText}</label>
      <QuestionInput
        type="number"
        min={minimum}
        max={maximum}
        defaultValue={answer}
        onBlur={handleChange}
        {...{ id, step }}
      />
    </QuestionNumber>
  );
};

NumberQuestion.displayName = "Questions.Number";

export default NumberQuestion;
