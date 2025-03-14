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
  width: 100vw;
  max-width: 100%;
  height: 100%;
  padding: var(--PADDING_SMALL, 20px);
  overflow-y: auto;
  background-color: var(--white, #fff);

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
  display: flex;
  align-items: center;
  height: var(--section-item-size);
  padding-inline: calc(var(--section-item-size) * 0.5);
  margin-block: var(--section-accent-spacing);
  color: var(--neutral95, #1f2121);
  border-left: var(--section-accent-spacing) solid var(--section-accent-color);
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
  height: var(--section-item-size);
  border-left: var(--section-accent-spacing) solid var(--section-accent-color);
`;

export const PageLink = styled(Link)`
  --page-link-background: transparent;
  --page-link-color: var(--neutral95, #1f2121);
  --page-number-outline: transparent;

  display: flex;
  gap: 1ch;
  align-items: center;
  width: 100%;
  padding-inline-end: 1ch;
  color: var(--page-link-color);
  text-decoration: none;
  background-color: var(--page-link-background);

  &[aria-disabled="true"] {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }

  &[aria-current="page"] {
    --page-link-background: var(--turquoise85, #12726c);
    --page-link-color: var(--white, #fff);
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
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PageNumber = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 0 0 var(--section-item-size);
  align-items: center;
  justify-content: center;
  width: var(--section-item-size);
  height: var(--section-item-size);
  padding: 0;
  margin: 0;
  outline: 1px solid var(--page-number-outline);
  outline-offset: -1px;

  &::before {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-color: var(--page-number-background, transparent);
    opacity: 0.3;
  }
`;

export const CheckpointIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--section-item-size) / 2);
  height: calc(var(--section-item-size) / 2);
  overflow: hidden;
  background-color: var(--icon-background, #ffe266);
  border: 1px solid var(--neutral60, #6a6e6e);
  border-radius: 50%;
`;

export const CloseButton = styled.button`
  height: 1.5em;
  aspect-ratio: 1;
  margin-left: auto;

  &:not(:disabled):focus,
  &:not(:disabled):hover {
    outline: 2px solid var(--black, #000);
  }
`;
