"use client";
import styled from "styled-components";

export const Number = styled.li`
  &[data-direction="block"] {
    & > * + * {
      margin-block-start: var(--PADDING_SMALL, 20px);
    }
  }

  &[data-direction="inline"] {
    > * + * {
      margin-inline-start: 0.5ch;
    }
  }
`;
