"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { MultipartQuestionData } from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";
import { PartProps } from "..";
import * as Styled from "../Select/styles";

const Fragment = graphql(`
  fragment MultiselectPart on multiPartBlocks_multiselect_BlockType {
    id
    type: typeHandle
    options: answerOptions {
      ... on answerOptions_option_BlockType {
        id
        label: optionLabel
        value: optionValue
      }
    }
  }
`);

const Multiselect: FunctionComponent<
  PartProps<FragmentType<typeof Fragment>>
> = ({ id, questionId, data }) => {
  const { options } = useFragment(Fragment, data);
  const { answer = {}, onChangeCallback } =
    useAnswer<MultipartQuestionData>(questionId);
  const { t } = useTranslation();
  const value = answer[id] || [];

  return (
    <Styled.InlineSelect
      {...{ options, value }}
      placeholder={t("translation:placeholder.select")}
      onChangeCallback={(value: string[] | null) =>
        onChangeCallback && onChangeCallback({ ...answer, [id]: value })
      }
      maxWidth="auto"
      isMultiselect
    />
  );
};

Multiselect.displayName = "Questions.Multipart.Multiselect";

export default Multiselect;
