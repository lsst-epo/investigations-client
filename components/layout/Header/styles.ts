import Button from "@rubin-epo/epo-react-lib/Button";
import styled from "styled-components";

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: var(--header-height);
  overflow-x: hidden;
  background-color: var(--turquoise85, #12726d);
  transform: none;
  transition: transform 0.4s;
  z-index: 15;

  &[aria-hidden="true"] {
    transform: translate3d(0, -100%, 0);
  }

  @media only print {
    display: none;
  }
`;

export const TopRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
`;

export const BottomRow = styled.div`
  display: flex;
  width: 100%;
`;

export const MenuToggle = styled(Button)`
  --button-border-color: var(--white, #fff);

  justify-content: center;
  height: 100%;
  aspect-ratio: 1;
  padding: 15px;
  border: none;

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
    outline-width: 1px;
    outline-offset: -10px;
  }
`;