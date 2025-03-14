import styled, { css } from "styled-components";

export const Dialog = styled.div`
  container-type: inline-size;

  &[data-modal-open="true"] {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    max-width: calc(100vw - var(--scrollbar-width));
    height: 100%;
    min-height: 100vh;
    overflow-y: hidden;

    > [aria-modal="true"] {
      position: relative;
      display: flex;
      place-items: center center;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      color: var(--white, #fff);
    }
  }
`;

export const Backdrop = styled.div<{ open: boolean }>`
  z-index: -1;
  grid-column: 2;

  ${({ open }) =>
    open
      ? css`
          position: absolute;
          visibility: visible;
          width: 100%;
          height: 100%;
          background-color: var(--neutral95, #1f2121);
        `
      : css`
          visibility: hidden;
        `}
`;
