import styled from "styled-components";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";

export const Heading = styled.h2`
  margin-block-end: ${fluidScale("2em", "1.5em")};
`;
export const InteractionGroup = styled.div`
  --content-block-margin: ${fluidScale(
    "var(--PADDING_MEDIUM, 40px)",
    "var(--PADDING_SMALL, 20px)"
  )};

  padding: ${fluidScale("2em", "1.5em")};
  background-color: #e6ffe6;

  > * + * {
    margin-block-start: var(--content-block-margin);
  }
`;
