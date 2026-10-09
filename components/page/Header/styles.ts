import styled from "styled-components";

export const TocToggle = styled.button`
  display: flex;
  gap: 1ch;
  align-items: center;
  padding-inline: 1em;
  font-size: 80%;
  color: var(--white, #fff);

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
    text-decoration: underline;
  }
`;

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageNumber = styled.span`
  position: absolute;
  font-size: 80%;
  color: var(--neutral95, #1f2121);
`;
