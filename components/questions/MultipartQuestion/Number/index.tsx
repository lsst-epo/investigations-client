"use client";
import { FocusEventHandler, FunctionComponent } from "react";
import toast from "react-hot-toast";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useDebouncedCallback } from "use-debounce";
import { PartProps } from "..";
import { stepFromPrecision } from "@/components/questions/utils";
import useAnswer from "@/hooks/useAnswer";
import { MultipartQuestionData } from "@/types/answers";
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
  const step = stepFromPrecision(precision);
  const hasValidation = validation && validation.length > 0;

  const validate = async (value?: number) => {
    const result = await validateQuestion({
      id: questionId,
      partId: id,
      value,
      locale,
    });

    if (result) {
      toast.dismiss();
      toast(result);
    }
  };

  const handleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    const value = parseFloat(event.target.value);

    if (value !== answer[id]) {
      hasValidation && validate(value);
      onChangeCallback && onChangeCallback({ ...answer, [id]: value });
    }
  };

  const debouncedHandleChange = useDebouncedCallback(handleChange, 500);

  return (
    <Styled.InlineTextInput
      type="number"
      min={minimum}
      max={maximum}
      defaultValue={answer[id] || undefined}
      onChange={debouncedHandleChange}
      {...{ id, step }}
    />
  );
};

NumberPart.displayName = "Questions.Multipart.Number";

export default NumberPart;
