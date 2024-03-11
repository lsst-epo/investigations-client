import { FunctionComponent, ReactNode } from "react";
import * as Styled from "./styles";

const Output: FunctionComponent<{
  value?: string | number;
  forId?: string;
  placeholder: ReactNode;
}> = ({ value, placeholder, forId }) => {
  return <Styled.Output htmlFor={forId}>{value || placeholder}</Styled.Output>;
};

Output.displayName = "Calculator.Output";

export default Output;
