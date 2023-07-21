import styled from "styled-components";

export const TextInput = styled.input`
  --text-bg: var(--question-background-color);
  --text-border: 1px solid var(--question-border-color);

  background-color: var(--text-bg);
  border: var(--text-border);
  border-radius: 5px;
  color: var(--question-input-color);
  display: block;
  font-size: 1rem;
  margin-block-start: var(--PADDING_SMALL, 20px);
  padding: 0;
  padding-inline: 1ch;
  width: 100%;
  height: 2rem;

  &:not(:disabled):not(:read-only):hover,
  &:not(:disabled):not(:read-only):active,
  &:not(:disabled):not(:read-only):focus {
    outline: 2px solid var(--question-border-color);
    outline-offset: -2px;
  }

  &:disabled {
    --text-bg: #f5f5f5;
    --question-border-color: #6a6e6e;
  }
`;
