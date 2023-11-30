"use client";
import styled from "styled-components";

export const Input = styled.input`
  --input-background-color: var(--turquoise10, #d9f7f6);
  --input-border-color: var(--turquoise85, #12726d);
  --input-color: var(--neutral95, #1f2121);

  background-color: var(--input-background-color);
  border: 1px solid var(--input-border-color);
  border-radius: 5px;
  color: var(--input-color);
  display: block;
  font-size: 1rem;
  margin-block-start: 1em;
  padding: 0;
  padding-inline: 1ch;
  width: 100%;
  height: 2rem;

  &:not(:disabled):not(:read-only):hover,
  &:not(:disabled):not(:read-only):active,
  &:not(:disabled):not(:read-only):focus {
    outline: 2px solid var(--input-border-color);
    outline-offset: -2px;
  }

  &:disabled {
    --input-background-color: #f5f5f5;
    --input-border-color: #6a6e6e;
  }
`;

Input.displayName = "Form.Input";
