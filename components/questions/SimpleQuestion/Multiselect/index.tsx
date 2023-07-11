import { FunctionComponent } from "react";
import { Option } from "@/components/shapes/option";
import * as Styled from "../Select/styles";

interface SimpleMultiselectProps {
  id: string;
  value?: string[];
  isDisabled?: boolean;
  onChangeCallback: (value: string[] | null) => void;
  options: Option[];
}

const SimpleMultiselect: FunctionComponent<SimpleMultiselectProps> = ({
  id,
  value = [],
  isDisabled,
  onChangeCallback,
  options = [],
}) => {
  return (
    <Styled.Select
      id={id}
      value={value}
      isDisabled={isDisabled}
      isMultiselect={true}
      options={options}
      onChangeCallback={(value: string[] | null) =>
        onChangeCallback && onChangeCallback(value)
      }
      width="100%"
      maxWidth="100%"
    />
  );
};

SimpleMultiselect.displayName = "Questions.Simple.Multiselect";

export default SimpleMultiselect;
