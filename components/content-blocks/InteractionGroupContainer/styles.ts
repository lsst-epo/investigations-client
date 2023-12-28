"use client";
import styled from "styled-components";
import { fluidScale, token } from "@rubin-epo/epo-react-lib/styles";

export const Heading = styled.h2`
  margin-block-end: ${fluidScale("2em", "1.5em")};
`;
export const InteractionGroup = styled.div`
  --interaction-group-margin: var(
    --content-block-margin,
    ${fluidScale("var(--PADDING_MEDIUM, 40px)", "var(--PADDING_SMALL, 20px)")}
  );

  padding: var(--interaction-group-margin);
  margin-inline: calc(-1 * var(--interaction-group-margin));
  background-color: #e6ffe6;

  > * + * {
    margin-block-start: var(--interaction-group-margin);
  }

  @media screen and (min-width: ${token("BREAK_TABLET_MIN")}) {
    margin-inline: 0;
  }
`;
