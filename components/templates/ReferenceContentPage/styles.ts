"use client";
import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";

export const ContentBlocks = styled(Container)`
  --content-block-margin: ${fluidScale(
    "var(--PADDING_MEDIUM, 40px)",
    "var(--PADDING_SMALL, 20px)"
  )};
  padding-block-start: 67px;
  padding-block-end: var(--pager-height);

  > * + * {
    margin-block-start: var(--content-block-margin);
  }
`;

export const Title = styled.h1`
  --title-margin: ${fluidScale("2em", "1em")};
  margin-block-end: var(--title-margin);
`;
