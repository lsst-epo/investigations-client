"use client";

import { ChangeEvent, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { notNull } from "@/lib/utils";
import useAnswer from "@/hooks/useAnswer";
import { WidgetInput } from "@/types/answers";
import { QuestionTableInputProps } from "../Table";
import ReadOnlyInput from "../ReadOnly";

import * as Styled from "./styles";
const TextQuestionCell: FunctionComponent<QuestionTableInputProps> = ({
  id,
  questionId,
  readOnly = false,
}) => {
  const { t } = useTranslation();
  const { answer, onChangeCallback } = useAnswer<WidgetInput>(questionId);
  const cellValue = notNull(answer) ? answer[id] : null;

  if (readOnly) return <ReadOnlyInput value={cellValue} />;

  return (
    <Styled.TextInput
      type="text"
      placeholder={t("placeholder.text_answer")}
      defaultValue={cellValue}
      onBlur={(event: ChangeEvent<HTMLInputElement>) =>
        onChangeCallback &&
        onChangeCallback({ ...answer, [id]: event.target.value })
      }
      readOnly={readOnly}
    />
  );
};

TextQuestionCell.displayName = "Questions.Tabular.Text";

export default TextQuestionCell;
