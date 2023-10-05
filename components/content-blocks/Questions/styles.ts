import styled from "styled-components";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";

export const Heading = styled.h2`
  padding-block-end: ${fluidScale("57px", "47px")};
`;

export const QuestionList = styled.ol`
  --question-color: #34706d;
  --question-background-color: var(--turquoise10, #d9f7f6);
  --question-border-color: var(--turquoise85, #12726d);
  --question-input-color: var(--neutral95, #1f2121);

  background-color: var(--list-background-color, transparent);
  color: var(--question-color);
  list-style-type: decimal;
  list-style-position: inside;
  padding: var(--list-padding, 0);

  & > li + li {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;
