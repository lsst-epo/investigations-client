"use client";
import { FocusEventHandler, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { PartProps } from "..";
import { stepFromPrecision } from "@/components/questions/utils";
import { validateQuestion } from "@/components/questions/actions";
import toast from "react-hot-toast";
import useAnswer from "@/hooks/useAnswer";
import { MultipartQuestionData } from "@/types/answers";
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

  const handleChange: FocusEventHandler<HTMLInputElement> = async (event) => {
    const value = parseFloat(event.target.value);

    if (value !== answer[id]) {
      console.log({ validation });
      if (validation && validation.length > 0) {
        const result = await validateQuestion({
          id: questionId,
          partId: id,
          value,
          locale,
        });

        if (result) {
          toast(result);
        }
      }

      onChangeCallback && onChangeCallback({ ...answer, [id]: value });
    }
  };

  const step = stepFromPrecision(precision);

  return (
    <Styled.InlineTextInput
      type="number"
      min={minimum}
      max={maximum}
      defaultValue={answer[id]}
      onBlur={handleChange}
      {...{ id, step }}
    />
  );
};

NumberPart.displayName = "Questions.Multipart.Number";

export default NumberPart;
