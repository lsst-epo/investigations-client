import styled from "styled-components";
import Button from "@rubin-epo/epo-react-lib/Button";

export const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  transform: none;
  transition: transform 0.4s;
  background-color: var(--turquoise85, #12726d);
  z-index: 1;

  &[aria-hidden="true"] {
    transform: translate3d(0, -100%, 0);
  }
`;

export const MenuToggle = styled(Button)`
  --button-border-color: var(--white, #fff);

  aspect-ratio: 1;
  border: none;
  height: 100%;
  justify-content: center;
  padding: 15px;

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    outline-width: 1px;
    outline-offset: -10px;
  }
`;

export const FullWidthCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
`;

export const BottomRow = styled.div`
  display: flex;
  width: 100%;
`;
