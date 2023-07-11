import styled from "styled-components";

export const TextInput = styled.input`
  background-color: var(--question-background-color);
  border: 1px solid var(--question-border-color);
  border-radius: 5px;
  color: var(--question-input-color);
  display: block;
  font-size: 1rem;
  margin-block-start: var(--PADDING_SMALL, 20px);
  padding: 0;
  padding-inline: 1ch;
  width: 100%;
  height: 2rem;

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
