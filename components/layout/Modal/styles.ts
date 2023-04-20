import ExpandContract from "@/atomic/ExpandContract/ExpandContract";
import styled, { css } from "styled-components";

export const Dialog = styled.div<{ open: boolean }>`
  ${({ open }) =>
    open
      ? css`
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          min-width: 100vw;
          min-height: 100vh;
          overflow-y: hidden;

          > [aria-modal="true"] {
            overflow-y: auto;
            width: 100%;
            height: 100%;
            display: grid;
            align-items: center;
            justify-items: center;
            grid-template-columns: 1fr;
            grid-template-rows: min-content 1fr;
            grid-template-areas:
              "header"
              "component";
          }
        `
      : null}
`;

export const ComponentWrapper = styled.div`
  grid-area: component;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.div<{ $hasTitle: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  padding: 1ch;
  width: 100%;

  ${({ $hasTitle }) => css`
    background-color: ${$hasTitle
      ? "var(--turquoise85, #12726c)"
      : "transparent"};
  `}
`;

export const Close = styled(ExpandContract)`
  margin-left: auto;
`;

export const Title = styled.span`
  color: var(--white, #fff);
  font-weight: var(--FONT_WEIGHT_BOLD, 600);
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
