import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function Body({ children }) {
  return (
    <Styled.WideWidthContainer>
      <main id="page-content">{children}</main>
    </Styled.WideWidthContainer>
  );
}

Body.displayName = "Global.Body";

Body.propTypes = {
  children: PropTypes.node,
};
