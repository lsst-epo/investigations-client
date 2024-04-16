"use client";
import styled from "styled-components";

export const Alert = styled.div`
  background-color: var(--neutral08, #ebebeb);
  color: var(--neutral80, #404040);
  padding: var(--PADDING_SMALL, 20px);

  & > * + * {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;

export const Error = styled.pre`
  background-color: var(--neutral20, #dce0e3);
  margin-bottom: 0;
  padding: var(--PADDING_SMALL, 20px);
`;
