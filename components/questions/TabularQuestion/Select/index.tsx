"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import useAnswer from "@/hooks/useAnswer";
import { QuestionTableInputProps } from "../Table";
import * as Styled from "./styles";
import { notNull } from "@/lib/utils";
import { WidgetInput } from "@/types/answers";

const SelectQuestionCell: FunctionComponent<QuestionTableInputProps> = ({
  id,
  questionId,
  options = [],
}) => {
  const { t } = useTranslation();
  const { answer, onChangeCallback } = useAnswer<WidgetInput>(questionId);
  const cellValue = notNull(answer) ? answer[id] : null;

  return (
    <Styled.InputContainer>
      <Styled.Select
        {...{ id, options }}
        value={cellValue || null}
        isMultiselect={false}
        onChangeCallback={(value: string | null) =>
          onChangeCallback && onChangeCallback({ ...answer, [id]: value })
        }
        placeholder={t("placeholder.select_answer")}
        maxWidth="100%"
      />
    </Styled.InputContainer>
  );
};

SelectQuestionCell.displayName = "Questions.Tabular.Select";

export default SelectQuestionCell;
