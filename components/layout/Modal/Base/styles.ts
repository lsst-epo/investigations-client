import styled, { css } from "styled-components";

export const Dialog = styled.div`
  container-type: inline-size;

  &[data-modal-open="true"] {
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: calc(100vw - var(--scrollbar-width));
    top: 0;
    left: 0;
    min-height: 100vh;
    overflow-y: hidden;
    z-index: 1;

    > [aria-modal="true"] {
      color: var(--white, #fff);
      overflow-y: auto;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-items: center;
      position: relative;
    }
  }
`;

export const Backdrop = styled.div<{ open: boolean }>`
  grid-column: 2;
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
