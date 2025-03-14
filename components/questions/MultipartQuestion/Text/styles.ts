"use client";
import styled from "styled-components";

export const InlineTextInput = styled.input`
  box-sizing: content-box;
  display: inline;
  height: 100%;
  padding: 0;
  padding-inline: 1ch;
  color: var(--question-input-color);
  background-color: var(--question-background-color);
  border: 1px solid var(--question-border-color);
  border-radius: 5px;

  &:not(:disabled):hover,
  &:not(:disabled):active,
  &:not(:disabled):focus {
    outline: 2px solid var(--question-border-color);
    outline-offset: -2px;
  }

  &:disabled {
    --question-background-color: #f5f5f5;
    --question-border-color: #6a6e6e;
  }
`;
