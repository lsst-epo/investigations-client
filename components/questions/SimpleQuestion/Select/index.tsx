import { FunctionComponent } from "react";
import { Option } from "@/components/shapes/option";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

interface SimpleSelectProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string | null) => void;
  options: Option[];
}

const SimpleSelect: FunctionComponent<SimpleSelectProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  options = [],
}) => {
  const { t } = useTranslation();
  return (
    <Styled.Select
      placeholder={t("translation:placeholder.select")}
      id={id}
      value={value || null}
      isDisabled={isDisabled}
      isMultiselect={false}
      options={options}
      onChangeCallback={(value: string | null) =>
        onChangeCallback && onChangeCallback(value)
      }
      width="100%"
      maxWidth="100%"
    />
  );
};

SimpleSelect.displayName = "Questions.Simple.Select";

export default SimpleSelect;
