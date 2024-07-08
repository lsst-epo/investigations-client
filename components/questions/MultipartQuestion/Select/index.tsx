"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { PartProps } from "..";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";
import { MultipartQuestionData } from "@/types/answers";
import useAnswer from "@/hooks/useAnswer";

const Fragment = graphql(`
  fragment SelectPart on multiPartBlocks_select_BlockType {
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

const Select: FunctionComponent<PartProps<FragmentType<typeof Fragment>>> = ({
  id,
  questionId,
  data,
}) => {
  const { options } = useFragment(Fragment, data);
  const { answer, onChangeCallback } =
    useAnswer<MultipartQuestionData>(questionId);
  const { t } = useTranslation();

  return (
    <Styled.InlineSelect
      {...{ options }}
      placeholder={t("translation:placeholder.select")}
      onChangeCallback={(value: string | null) =>
        onChangeCallback && onChangeCallback({ ...answer, [id]: value })
      }
      maxWidth="auto"
      value={answer ? answer[id] : null}
    />
  );
};

Select.displayName = "Questions.Multipart.Select";

export default Select;
