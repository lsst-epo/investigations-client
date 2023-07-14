import styled from "styled-components";

export const InlineTextInput = styled.input`
  background-color: var(--question-background-color);
  border: 1px solid var(--question-border-color);
  border-radius: 5px;
  color: var(--question-input-color);
  display: inline;
  padding: 0;
  padding-inline: 1ch;
  height: 100%;

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
