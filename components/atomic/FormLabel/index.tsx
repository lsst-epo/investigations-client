import { FunctionComponent, PropsWithChildren } from "react";
import * as Styled from "./styles";

interface FormLabelProps {
  htmlFor?: string;
}

const FormLabel: FunctionComponent<PropsWithChildren<FormLabelProps>> = ({
  htmlFor,
  children,
}) => {
  return <Styled.Label htmlFor={htmlFor}>{children}</Styled.Label>;
};

FormLabel.displayName = "Atom.FormLabel";

export default FormLabel;
