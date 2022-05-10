import PropTypes from "prop-types";
import Container from "@/layout/Container";

export default function TextContentBlock({ text }) {
  return (
    <Container paddingSize="medium">
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className="c-content-rte"
      />
    </Container>
  );
}

TextContentBlock.displayName = "ContentBlock.Text";

TextContentBlock.propTypes = {
  text: PropTypes.node.isRequired,
};
