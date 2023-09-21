import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";

export const ContentBlocks = styled(Container)`
  padding-block-start: 67px;
  padding-block-end: var(--pager-height);

  .content-block {
    margin-block-end: ${fluidScale("40px", "var(--PADDING_SMALL, 20px)")};
  }
`;

export const Title = styled.h1`
  padding-block-end: ${fluidScale("57px", "47px")};
`;
