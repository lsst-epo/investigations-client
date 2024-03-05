"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import useAnswer from "@/hooks/useAnswer";
import { QuestionTableInputProps } from "../Table";
import * as Styled from "./styles";
import { notNull } from "@/lib/utils";
import { WidgetInput } from "@/types/answers";
import ReadOnlyInput from "../ReadOnly";
import { getLabelByValue } from "../../utils";

const SelectQuestionCell: FunctionComponent<QuestionTableInputProps> = ({
  id,
  questionId,
  options = [],
  readOnly = false,
}) => {
  const { t } = useTranslation();
  const { answer, onChangeCallback } = useAnswer<WidgetInput>(questionId);
  const cellValue = notNull(answer) ? answer[id] : null;

  if (readOnly)
    return <ReadOnlyInput value={getLabelByValue(options, cellValue)} />;

  return (
    <Styled.InputContainer>
      <Styled.Select
        {...{ id, options }}
        value={cellValue || null}
        isMultiselect={false}
        isDisabled={readOnly}
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
