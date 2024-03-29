import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { InlineMultiselectPart } from "..";
import * as Styled from "../Select/styles";

interface InlineSelectProps extends InlineMultiselectPart {
  onChangeCallback: (value: string[] | null, id: string) => void;
  isDisabled?: boolean;
  value: string[];
}

const InlineMultiselect: FunctionComponent<InlineSelectProps> = ({
  onChangeCallback,
  isDisabled,
  options,
  value,
  id,
}) => {
  const { t } = useTranslation();
  return (
    <Styled.InlineSelect
      {...{ isDisabled, options }}
      placeholder={t("translation:placeholder.select")}
      onChangeCallback={(value: string[] | null) =>
        onChangeCallback && onChangeCallback(value, id)
      }
      value={value || []}
      isMultiselect
    />
  );
};

InlineMultiselect.displayName = "Questions.Inline.Multiselect";

export default InlineMultiselect;
