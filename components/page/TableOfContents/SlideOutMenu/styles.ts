import styled from "styled-components";
import {
  zStack,
  BREAK_TABLET_MIN,
} from "@/styles/globalStyles";
import {
  MENU_TRANSITION_TIME,
  MENU_SLIDE_TIME,
  MENU_SLIDE_DELAY,
} from "./constants";
import { protoButton } from "@/styles/mixins/appearance";

export const Overlay = styled.div`
  --menu-transition-time: ${MENU_TRANSITION_TIME}ms;
  --menu-slide-time: ${MENU_SLIDE_TIME}ms;
  --menu-slide-delay: ${MENU_SLIDE_DELAY}ms;

  --background-color: transparent;
  --pointer-events: none;
  --transform: translateX(100%);

  background-color: var(--background-color, transparent);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${zStack.dialog};
  transition: background-color var(--menu-slide-time);
  transition-delay: var(--menu-slide-delay);
  pointer-events: var(--pointer-events);
  visibility: var(--visibility, hidden);

  &:not([aria-hidden="true"]) {
    --background-color: rgba(0, 0, 0, 0.7);
    --pointer-events: auto;
    --transform: translateX(0);
  }
`;

export const MenuContainer = styled.div`
  --menu-padding: var(--PADDING_SMALL, 20px);

  background-color: var(--white, #fff);
  box-sizing: border-box;
  color: var(--neutral80, #404040);
  padding: var(--menu-padding);
  height: 100%;
  width: 20rem;
  max-width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform var(--menu-slide-time) ease-in;
  transition-delay: var(--menu-slide-delay);
  transform: var(--transform);
  overflow-y: auto;

  & > * + * {
    margin-block-start: calc(var(--menu-padding) / 2);
  }

  @media screen and (min-width: ${BREAK_TABLET_MIN}) {
    --menu-padding: var(--PADDING_MEDIUM, 40px);
  }
`;

export const MenuHeader = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: end;
`;

export const MenuCloseButton = styled.button`
  ${protoButton()}
  aspect-ratio: 1;
  color: var(--neutral80, #404040);

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    outline: 3px solid var(--neutral80, #404040);
  }
`;
