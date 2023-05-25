"use client";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function Body({ children }) {
  return (
    <WideWidthContainer>
      <main id="page-content">{children}</main>
    </WideWidthContainer>
  );
}

const WideWidthContainer = styled.div`
  max-width: 2000px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
Body.displayName = "Global.Body";

Body.propTypes = {
  children: PropTypes.node,
};
