"use client";
import {
  FocusEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { PartProps } from "..";
import { stepFromPrecision } from "@/components/questions/utils";
import useAnswer from "@/hooks/useAnswer";
import { MultipartQuestionData } from "@/types/answers";
import { useDebounce } from "@/hooks/useDebounce";
import { validateQuestion } from "../../actions";
import * as Styled from "../Text/styles";

const Fragment = graphql(`
  fragment NumberPart on multiPartBlocks_number_BlockType {
    id
    type: typeHandle
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

const NumberPart: FunctionComponent<
  PartProps<FragmentType<typeof Fragment>>
> = ({ data, id, locale, questionId }) => {
  const { minimum, maximum, precision, validation } = useFragment(
    Fragment,
    data
  );
  const { answer = {}, onChangeCallback } =
    useAnswer<MultipartQuestionData>(questionId);
  const [value, setValue] = useState<number>(answer[id] as number);
  const debouncedValue = useDebounce(value, 500);

  const validate = async () => {
    const result = await validateQuestion({
      id: questionId,
      partId: id,
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

    onChangeCallback && onChangeCallback({ ...answer, [id]: value });
  };

  const handleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    const value = parseFloat(event.target.value);

    if (value !== answer[id]) {
      setValue(value);
    }
  };

  useEffect(() => {
    if (debouncedValue !== answer[id] && validation && validation.length > 0) {
      validate();
    }
  }, [debouncedValue]);

  const step = stepFromPrecision(precision);

  return (
    <Styled.InlineTextInput
      type="number"
      min={minimum}
      max={maximum}
      defaultValue={answer[id]}
      onBlur={handleBlur}
      onChange={handleChange}
      {...{ id, step }}
    />
  );
};

NumberPart.displayName = "Questions.Multipart.Number";

export default NumberPart;
