import styled, { css } from "styled-components";

export const Dialog = styled.div<{ open: boolean }>`
  ${({ open }) =>
    open
      ? css`
          position: fixed;
          width: 100%;
          height: 100%;
          max-width: 100vw;
          max-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : null}
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  grid-template-areas:
    "close"
    ".";
`;

export const Backdrop = styled.div<{ open: boolean }>`
  z-index: -1;

  ${({ open }) =>
    open
      ? css`
          background-color: var(--neutral95, #1f2121);
          visibility: visible;
          width: 100%;
          height: 100%;
          position: absolute;
        `
      : css`
          visibility: hidden;
        `}
`;
