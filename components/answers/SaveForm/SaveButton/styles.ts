import styled from "styled-components";

export const SaveButton = styled.button`
  --save-background-color: #ffe266;
  --save-border-color: #707070;

  display: flex;
  align-items: center;
  gap: 1em;
  color: var(--black, #000);
  background-color: var(--save-background-color);
  border: 1px solid var(--save-border-color);
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 1em;
  width: 100%;

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]):focus,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    box-shadow: inset 0 0 0 3px var(--white);
    outline: 2px solid var(--save-border-color);
    outline-offset: -3px;
  }

  &:disabled,
  &[aria-disabled="true"] {
    --save-background-color: var(--neutral40);
    pointer-events: none;
  }
`;

export const SaveIcon = styled.div`
  aspect-ratio: 1;
  background-color: var(--white, #fff);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  stroke-width: 0;
`;
