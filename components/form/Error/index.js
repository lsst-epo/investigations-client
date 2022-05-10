import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import * as Styled from "./styles";

export default function Error({ children, ...props }) {
  const { t } = useTranslation();

  return (
    <Styled.Error role="alert" {...props}>
      <span className="a-hidden">{t("form.error_label")}</span>
      {children}
    </Styled.Error>
  );
}

Error.propTypes = {
  children: PropTypes.node,
};
