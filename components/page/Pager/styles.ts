import styled from "styled-components";
import Link from "next/link";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const PagerContainer = styled.nav`
  --pager-columns: repeat(2, 1fr);

  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: var(--pager-columns);
  align-items: stretch;
  width: 100%;
  max-width: var(--max-page-width);
  height: var(--pager-height);
  background-color: var(--turquoise85, #12726d);

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --pager-columns: 1fr max-content 1fr;

    grid-gap: var(--PADDING_SMALL);
    align-items: center;
  }

  @media only print {
    display: none;
  }
`;

export const PagerButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--white, #fff);
  text-decoration: none;
  border: none;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
    outline: 1px solid var(--white);
    outline-offset: -3px;
  }

  &[aria-disabled="true"] {
    pointer-events: none;
    cursor: default;
    background-color: #707070;
  }

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    text-transform: uppercase;

    &:not(:disabled, [aria-disabled="true"]):hover,
    &:not(:disabled, [aria-disabled="true"]):focus-visible,
    &:not(:disabled, [aria-disabled="true"]).focus-visible {
      text-decoration: underline;
      outline: none;
    }

    &:first-of-type {
      justify-content: flex-end;
    }

    &:last-of-type {
      justify-content: flex-start;
    }

    &[aria-disabled="true"] {
      font-weight: normal;
      pointer-events: none;
      cursor: default;
      background-color: transparent;
      opacity: 0.8;
    }
  }
`;

export const PageCount = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  height: calc(var(--pager-height) - var(--PADDING_SMALL));
  padding: 0 calc(var(--PADDING_SMALL));
  background-color: var(--white, #fff);
  border-radius: 10px;

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    display: flex;
  }
`;
