"use client";

import { FocusEventHandler, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import useAnswer from "@/hooks/useAnswer";
import type { WidgetInput } from "@/types/answers";
import { QuestionTableInputProps } from "../Table";

import * as Styled from "./styles";
const TextQuestionCell: FunctionComponent<QuestionTableInputProps> = ({
  id,
  questionId,
}) => {
  const { t } = useTranslation();
  const { answer, onChangeCallback } = useAnswer<WidgetInput>(questionId);

  const cellValue = answer ? answer[id] : null;

  const handleChange: FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    onChangeCallback && onChangeCallback({ ...answer, [id]: value });
  };

  return (
    <Styled.TextInput
      type="text"
      placeholder={t("placeholder.text_answer")}
      defaultValue={cellValue}
      onBlur={handleChange}
    />
  );
};

TextQuestionCell.displayName = "Questions.Tabular.Text";

export default TextQuestionCell;
