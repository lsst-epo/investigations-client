import { FunctionComponent } from "react";
import { Option } from "@/components/shapes/option";
import * as Styled from "./styles";

interface SimpleSelectProps {
  id: string;
  value?: string;
  isDisabled?: boolean;
  onChangeCallback: (value: string | null) => void;
  options: Option[];
  labelledById: string;
}

const SimpleSelect: FunctionComponent<SimpleSelectProps> = ({
  id,
  value,
  isDisabled,
  onChangeCallback,
  options = [],
  labelledById,
}) => {
  return (
    <Styled.Select
      labelledById={labelledById}
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
