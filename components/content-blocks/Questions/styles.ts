import styled from "styled-components";

export const Heading = styled.h2`
  margin-block-end: var(--content-block-margin);
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

  > li {
    & > * + * {
      margin-block-start: var(--PADDING_SMALL, 20px);
    }
  }

  & > li + li {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;

export const QuestionLabel = styled.div`
  display: inline;

  ul,
  ol {
    list-style: inside;

    ::marker {
      margin: 0;
    }
  }

  &:first-child {
  }

  & > *:first-child {
    display: inline;
  }

  & > * + * {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;
