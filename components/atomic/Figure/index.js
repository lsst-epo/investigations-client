import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function Figure({ children, caption, withBackground }) {
  return (
    <Styled.Figure $withBackground={withBackground}>
      {children}
      {caption && <Styled.FigCaption>{caption}</Styled.FigCaption>}
    </Styled.Figure>
  );
}

Figure.propTypes = {
  children: PropTypes.node.isRequired,
  caption: PropTypes.string,
  withBackground: PropTypes.bool,
};
