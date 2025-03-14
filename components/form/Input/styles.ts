"use client";
import styled from "styled-components";

export const Input = styled.input`
  --input-background-color: var(--turquoise10, #d9f7f6);
  --input-border-color: var(--turquoise85, #12726d);
  --input-color: var(--neutral95, #1f2121);
  --input-padding: 1ch;

  display: block;
  width: 100%;
  height: 2em;
  padding: 0;
  padding-inline: var(--input-padding, 1ch);
  margin-block-start: 1em;
  font-size: 1em;
  color: var(--input-color);
  background-color: var(--input-background-color);
  border: 1px solid var(--input-border-color);
  border-radius: 5px;

  &:not(:disabled, :read-only):hover,
  &:not(:disabled, :read-only):active,
  &:not(:disabled, :read-only):focus {
    outline: 2px solid var(--input-border-color);
    outline-offset: -2px;
  }

  &:disabled {
    --input-background-color: #f5f5f5;
    --input-border-color: #6a6e6e;
  }
`;

Input.displayName = "Form.Input";
