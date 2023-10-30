"use client";
import styled from "styled-components";

export const InlineContainer = styled.li`
  > * + * {
    margin: 0;
  }
  > * {
    margin-inline-end: 0.5ch;
  }
`;
