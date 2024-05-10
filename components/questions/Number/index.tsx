"use client";
import {
  FocusEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { NumberInput } from "@/types/answers";
import QuestionNumber from "@/components/questions/QuestionNumber";
import QuestionInput from "@/components/form/Input/patterns/Question";
import useAnswer from "@/hooks/useAnswer";
import { stepFromPrecision } from "../utils";
import { useDebounce } from "@/hooks/useDebounce";
import { validateQuestion } from "../actions";

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
  const [value, setValue] = useState(answer);
  const debouncedValue = useDebounce(value, 500);

  const step = stepFromPrecision(precision);

  const validate = async () => {
    const result = await validateQuestion({
      id,
      value: debouncedValue,
      locale,
    });

    if (result) {
      toast.dismiss();
      toast(result);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const value = parseFloat(event.target.value);
    if (value !== debouncedValue) {
      validate();
    }

    onChangeCallback && onChangeCallback(value);
  };

  const handleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    const value = parseFloat(event.target.value);

    if (value !== answer) {
      setValue(value);
    }
  };

  useEffect(() => {
    if (debouncedValue !== answer && validation && validation.length > 0) {
      validate();
    }
  }, [debouncedValue]);

  return (
    <QuestionNumber id={id}>
      <label htmlFor={id}>{questionText}</label>
      <QuestionInput
        type="number"
        min={minimum}
        max={maximum}
        defaultValue={answer}
        onChange={handleChange}
        onBlur={handleBlur}
        {...{ id, step }}
      />
    </QuestionNumber>
  );
};

NumberQuestion.displayName = "Questions.Number";

export default NumberQuestion;
