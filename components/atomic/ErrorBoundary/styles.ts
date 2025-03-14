"use client";
import styled from "styled-components";

export const Alert = styled.div`
  padding: var(--PADDING_SMALL, 20px);
  color: var(--neutral80, #404040);
  background-color: var(--neutral08, #ebebeb);

  & > * + * {
    margin-block-start: var(--PADDING_SMALL, 20px);
  }
`;

export const Error = styled.pre`
  padding: var(--PADDING_SMALL, 20px);
  margin-bottom: 0;
  background-color: var(--neutral20, #dce0e3);
`;
