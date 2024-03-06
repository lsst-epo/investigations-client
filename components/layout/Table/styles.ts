import styled from "styled-components";

export const TableWrapper = styled.div`
  --table-cell-bg: var(--neutral10, #f5f5f5);
  --table-border-width: 5px;
  --table-border-color: var(--white, #fff);
  --table-border: var(--table-border-width) solid var(--table-border-color);
  --table-header-height: 5em;

  padding-inline: var(--table-padding, 0);
  position: relative;

  @media only print {
    --table-header-height: auto;
    --table-border-width: 1px;
  }
`;

export const ScrollButton = styled.button`
  --scroll-btn-color: var(--black, #000);

  background-color: var(--white, #fff);
  border: 1px solid var(--scroll-btn-color);
  color: var(--scroll-btn-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(var(--table-border-width) + calc(var(--table-header-height) * 0.2));
  height: calc(var(--table-header-height) * 0.6);
  width: 2em;

  &:not(:disabled):not([aria-disabled="true"]):hover,
  &:not(:disabled):not([aria-disabled="true"]):focus-visible,
  &:not(:disabled):not([aria-disabled="true"]):focus,
  &:not(:disabled):not([aria-disabled="true"]).focus-visible {
    outline: 1px solid var(--scroll-btn-color);
  }

  & svg {
    pointer-events: none;
  }

  &:disabled {
    --scroll-btn-color: var(--neutral60, #6a6e6e);

    cursor: default;
  }

  &:first-of-type {
    left: -1px;
  }
  &:last-of-type {
    right: -1px;
  }

  @media only print {
    display: none;
  }
`;

export const ScrollWrapper = styled.div`
  overflow-x: hidden;
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 1rem;
  color: #313333;
  min-width: 100%;
`;
export const Header = styled.th`
  background-color: var(--table-cell-bg);
  border: var(--table-border);
  font-weight: normal;
  height: var(--table-header-height);
  text-align: center;
  padding-inline: 1em;
  white-space: nowrap;
  scroll-margin-inline: calc(1em + var(--table-border-width));
`;
export const Cell = styled.td`
  background-color: var(--table-cell-bg);
  border: var(--table-border);
  font-weight: normal;
  height: var(--table-header-height);
  padding: 1em;
  text-align: center;

  @media only print {
    padding: 0;
  }
`;
export const Caption = styled.caption`
  caption-side: bottom;
  font-size: 80%;
  margin-block-start: 1em;
  text-align: left;
`;
