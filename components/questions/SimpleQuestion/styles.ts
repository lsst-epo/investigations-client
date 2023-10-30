"use client";
import styled from "styled-components";

export const SimpleContainer = styled.li`
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
