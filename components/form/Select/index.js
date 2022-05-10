import { forwardRef } from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles";

const Select = forwardRef(({ options, emptyOption, ...restProps }, ref) => (
  <Styled.Wrapper>
    <Styled.Select ref={ref} {...restProps}>
      {emptyOption && (
        <option value={emptyOption.value}>{emptyOption.label}</option>
      )}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Styled.Select>
    <Styled.Icon icon="selectCaret" />
  </Styled.Wrapper>
));

Select.displayName = "Form.Select";

const optionProps = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionProps)).isRequired,
  emptyOption: PropTypes.shape(optionProps),
};

export default Select;
