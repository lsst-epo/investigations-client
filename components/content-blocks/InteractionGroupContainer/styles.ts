import styled from "styled-components";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";

export const Heading = styled.h2`
  margin-block-end: ${fluidScale("2em", "1.5em")};
`;
export const InteractionGroup = styled.div`
  padding: ${fluidScale("2em", "1.5em")};
  background-color: #e6ffe6;

  > section + section {
    margin-top: 1.5em;
  }
`;
