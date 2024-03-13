import { FunctionComponent, HTMLProps } from "react";
import * as Styled from "./styles";

interface MathInputProps extends HTMLProps<HTMLInputElement> {
  condensed?: boolean;
}

const MathInput: FunctionComponent<MathInputProps> = ({
  value,
  placeholder,
  condensed = false,
  ...props
}) => {
  const staticWidth = 6;
  const valueWidth = String(value).length;
  const placeholderWidth = placeholder?.length || 0;
  const width = Math.max(staticWidth, valueWidth, placeholderWidth);

  return (
    <Styled.MathInput
      {...props}
      type="number"
      placeholder={placeholder}
      value={value?.toString() || ""}
      style={{
        width: `calc(${width}ch + calc(var(--input-padding) * 2))`,
        height: condensed && "2em",
      }}
    />
  );
};

MathInput.displayName = "Form.Input.Math";

export default MathInput;
