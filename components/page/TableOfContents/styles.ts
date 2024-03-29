import styled from "styled-components";
import Link from "next/link";
import { colorCycle } from "@/styles/mixins/appearance";
import { token } from "@rubin-epo/epo-react-lib/styles";

const colors = [
  "#019305",
  "var(--turquoise85,#12726c)",
  "#006DA8",
  "#8C65A5",
  "#F0B670",
];

export const TableOfContents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white, #fff);
  overflow-y: auto;
  padding: var(--PADDING_SMALL, 20px);
  height: 100%;
  width: 100vw;
  max-width: 100%;

  > * + * {
    margin-block-start: var(--PADDING_MEDIUM, 40px);
  }

  @media only screen and (min-width: ${token("BREAK_MOBILE")}) {
    width: fit-content;
  }
`;
export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--PADDING_SMALL, 20px) / 2);
`;
export const SectionList = styled.ol`
  --section-item-size: 2rem;
  --section-accent-spacing: 2px;
`;
export const SectionTitle = styled.div`
  border-left: var(--section-accent-spacing) solid var(--section-accent-color);
  color: var(--neutral95, #1f2121);
  display: flex;
  align-items: center;
  height: var(--section-item-size);
  padding-inline: calc(var(--section-item-size) * 0.5);
  margin-block: var(--section-accent-spacing);
`;
export const PageList = styled.ol`
  font-size: 80%;
`;
export const Section = styled.li`
  ${colorCycle("--section-accent-color", colors)}
`;
export const Page = styled.li`
  display: flex;
  align-items: center;
  border-left: var(--section-accent-spacing) solid var(--section-accent-color);
  height: var(--section-item-size);
`;

export const PageLink = styled(Link)`
  --page-link-background: transparent;
  --page-link-color: var(--neutral95, #1f2121)
  --page-number-outline: transparent;

  background-color: var(--page-link-background);
  color: var(--page-link-color);
  display: flex;
  gap: 1ch;
  align-items: center;
  width: 100%;
  text-decoration: none;
  padding-inline-end: 1ch;

  &[aria-disabled="true"] {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }

  &[aria-current="page"] {
    --page-link-background: var(--turquoise85,#12726c);
    --page-link-color: var(--white,#fff)
  }

  &:not([aria-disabled="true"]):hover,
  &:not([aria-disabled="true"]):focus-visible,
  &:not([aria-disabled="true"]).focus-visible {
    --page-number-outline: var(--section-accent-color);
    font-weight: bold;
    outline: none;
  }
`;

export const LinkText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PageNumber = styled.div`
  outline: 1px solid var(--page-number-outline);
  outline-offset: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 var(--section-item-size);
  padding: 0;
  margin: 0;
  width: var(--section-item-size);
  height: var(--section-item-size);
  position: relative;
  z-index: 1;

  &::before {
    background-color: var(--page-number-background, transparent);
    opacity: 30%;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
`;

export const CheckpointIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--section-item-size) / 2);
  height: calc(var(--section-item-size) / 2);
  background-color: var(--icon-background, #ffe266);
  border-radius: 50%;
  border: 1px solid var(--neutral60, #6a6e6e);
  overflow: hidden;
`;

export const CloseButton = styled.button`
  aspect-ratio: 1;
  margin-left: auto;
  height: 1.5em;

  &:not(:disabled):focus,
  &:not(:disabled):hover {
    outline: 2px solid var(--black, #000);
  }
`;
