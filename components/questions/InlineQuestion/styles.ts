"use client";
import styled from "styled-components";

export const InlineContainer = styled.li`
  > * + * {
    margin: 0;
    margin-inline-start: 0.5ch;
  }
`;
