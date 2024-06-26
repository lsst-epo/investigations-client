import styled from "styled-components";
import Link from "next/link";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const PagerContainer = styled.nav`
  --pager-columns: repeat(2, 1fr);
  background-color: var(--turquoise85, #12726d);
  display: grid;
  position: sticky;
  bottom: 0;
  grid-template-columns: var(--pager-columns);
  grid-template-rows: 1fr;
  align-items: stretch;
  height: var(--pager-height);
  width: 100%;
  max-width: var(--max-page-width);

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --pager-columns: 1fr max-content 1fr;

    align-items: center;
    grid-gap: var(--PADDING_SMALL);
  }

  @media only print {
    display: none;
  }
`;

export const PagerButton = styled(Link)`
  border: none;
  color: var(--white, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    outline: 1px solid var(--white);
    outline-offset: -3px;
  }

  &[aria-disabled="true"] {
    background-color: #707070;
    pointer-events: none;
    cursor: default;
  }

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    text-transform: uppercase;

    &:not(:disabled):not([aria-disabled="true"]):hover,
    &:not(:disabled):not([aria-disabled="true"]):focus-visible,
    &:not(:disabled):not([aria-disabled="true"]).focus-visible {
      outline: none;
      text-decoration: underline;
    }

    &:first-of-type {
      justify-content: flex-end;
    }

    &:last-of-type {
      justify-content: flex-start;
    }

    &[aria-disabled="true"] {
      background-color: transparent;
      font-weight: normal;
      pointer-events: none;
      cursor: default;
      opacity: 80%;
    }
  }
`;

export const PageCount = styled.div`
  display: none;
  background-color: var(--white, #fff);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  height: calc(var(--pager-height) - var(--PADDING_SMALL));
  padding: 0 calc(var(--PADDING_SMALL));

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    display: flex;
  }
`;
