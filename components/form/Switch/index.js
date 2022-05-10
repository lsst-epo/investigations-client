import { forwardRef } from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles";

const Switch = forwardRef(({ onClick, checked = false, ...restProps }, ref) => (
  <Styled.Switch
    ref={ref}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onClick}
    {...restProps}
  >
    <Styled.Toggle />
    <Styled.Inner />
  </Styled.Switch>
));

Switch.displayName = "Form.Switch";

Switch.propTypes = {
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};

export default Switch;
