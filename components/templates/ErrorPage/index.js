"use client";

import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";

export default function ErrorPageTemplate({ data: { title, text } }) {
  return (
    <Container>
      <h1>{title}</h1>
      <div
        className="c-content-rte"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </Container>
  );
}

ErrorPageTemplate.propTypes = {
  data: PropTypes.object,
};
