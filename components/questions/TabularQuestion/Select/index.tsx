import { FunctionComponent } from "react";
import { useTranslation } from "@/lib/i18n/client";
import * as Styled from "./styles";
import { SelectCell } from "..";

interface SelectCellProps extends SelectCell {
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string | null, id: string) => void;
}

const SelectQuestionCell: FunctionComponent<SelectCellProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  options = [],
}) => {
  const { t } = useTranslation();
  return (
    <Styled.InputContainer>
      <Styled.Select
        id={id}
        value={value || null}
        isDisabled={isDisabled}
        isMultiselect={false}
        options={options}
        onChangeCallback={(value: string | null) =>
          onChangeCallback && onChangeCallback(value, id)
        }
        placeholder={t("placeholder.select_answer")}
      />
      <label htmlFor={id}>{value || t("placeholder.select_answer")}</label>
    </Styled.InputContainer>
  );
};

SelectQuestionCell.displayName = "Questions.Tabular.Select";

export default SelectQuestionCell;
