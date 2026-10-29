import styled from "styled-components";

export const ReadOnly = styled.div`
  min-width: 100%;
  padding: var(--readonly-padding, 0.25ch 1ch);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: var(--readonly-whitespace, nowrap);
  cursor: default;
  border: 1px solid var(--readonly-border-color);
  border-radius: 5px;

  @media only print {
    --readonly-border-color: transparent;
  }
`;
