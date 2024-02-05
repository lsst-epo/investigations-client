"use client";
import styled from "styled-components";
import QuestionNumber from "../QuestionNumber";

export const SimpleContainer = styled(QuestionNumber)`
  & > * + * {
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

  & > *:first-child {
    display: inline;
  }

  & > * + * {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;
