import styled from "styled-components";

export const SaveButton = styled.button`
  --save-background-color: #ffe266;
  --save-border-color: #707070;

  display: flex;
  gap: 1em;
  align-items: center;
  width: 100%;
  padding: 1em;
  font-size: 1rem;
  font-weight: bold;
  color: var(--black, #000);
  background-color: var(--save-background-color);
  border: 1px solid var(--save-border-color);
  border-radius: 5px;

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]):focus,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
    outline: 2px solid var(--save-border-color);
    outline-offset: -3px;
    box-shadow: inset 0 0 0 3px var(--white);
  }

  &:disabled,
  &[aria-disabled="true"] {
    --save-background-color: var(--neutral40);

    pointer-events: none;
  }
`;

export const SaveIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  aspect-ratio: 1;
  background-color: var(--white, #fff);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  stroke-width: 0;
`;
