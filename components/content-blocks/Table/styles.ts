"use client";
import styled from "styled-components";
import { fluidScale, token } from "@rubin-epo/epo-react-lib/styles";

export const Heading = styled.h2`
  margin-block-end: var(--content-block-margin);
`;

export const TableContentBlock = styled.section`
  --table-negative: ${fluidScale(
    "var(--PADDING_LARGE, 100px)",
    "var(--PADDING_SMALL, 20px)"
  )};

  margin-inline: calc(var(--table-negative) * -1);

  @media only screen and (min-width: ${token("BREAK_TABLET")}) {
    --table-negative: 0;
  }
`;
