import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Error from "../Error";
import * as Styled from "./styles";

export default function FormField({
  htmlFor,
  label,
  required,
  children,
  error,
  description,
  ...wrapperProps
}) {
  const { t } = useTranslation();

  return (
    <div {...wrapperProps}>
      <div>
        <Styled.Label htmlFor={htmlFor}>
          {t(label, { context: required ? "required" : "" })}
        </Styled.Label>
        {description && <Styled.Description>{description}</Styled.Description>}
      </div>
      <div>
        <Styled.InputWrapper>{children}</Styled.InputWrapper>
        {error && <Styled.InputError as={Error}>{error}</Styled.InputError>}
      </div>
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.string,
};
