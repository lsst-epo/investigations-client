import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import Body from "@/global/Body";

export default function ErrorPageTemplate({ data: { id, title, text, uri } }) {
  return (
    <Body title={title}>
      <Container>
        <h1>{title}</h1>
        <div
          className="c-content-rte"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Container>
    </Body>
  );
}

ErrorPageTemplate.propTypes = {
  data: PropTypes.object,
};
