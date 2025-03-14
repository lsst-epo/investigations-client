import styled from "styled-components";
import Button from "@rubin-epo/epo-react-lib/Button";

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

  &[aria-hidden="true"] {
    transform: translate3d(0, -100%, 0);
  }

  @media only print {
    display: none;
  }
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
