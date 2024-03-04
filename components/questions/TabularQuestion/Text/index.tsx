"use client";

import { ChangeEvent, FunctionComponent } from "react";
import useAnswer from "@/hooks/useAnswer";
import { QuestionTableInputProps } from "../Table";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

const TextQuestionCell: FunctionComponent<QuestionTableInputProps> = ({
  id,
  questionId,
  readOnly = false,
}) => {
  const { t } = useTranslation();
  const { answer, onChangeCallback } = useAnswer(questionId);

  const cellValue = answer?.data[id];

  return (
    <Styled.TextInput
      type="text"
      placeholder={t("placeholder.text_answer")}
      defaultValue={cellValue}
      onBlur={(event: ChangeEvent<HTMLInputElement>) =>
        onChangeCallback &&
        onChangeCallback({ ...answer?.data, [id]: event.target.value })
      }
      readOnly={readOnly}
    />
  );
};

TextQuestionCell.displayName = "Questions.Tabular.Text";

export default TextQuestionCell;
