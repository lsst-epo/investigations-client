import styled from "styled-components";

export const TableWrapper = styled.div`
  --table-cell-bg: var(--neutral10, #f5f5f5);
  --table-border-width: 5px;
  --table-border-color: var(--white, #fff);
  --table-border: var(--table-border-width) solid var(--table-border-color);
  --table-header-height: 5em;

  position: relative;
  padding-inline: var(--table-padding, 0);

  @media only print {
    --table-header-height: auto;
    --table-border-width: 1px;
  }
`;

export const ScrollButton = styled.button`
  --scroll-btn-color: var(--black, #000);

  position: absolute;
  top: calc(var(--table-border-width) + calc(var(--table-header-height) * 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: calc(var(--table-header-height) * 0.6);
  color: var(--scroll-btn-color);
  background-color: var(--white, #fff);
  border: 1px solid var(--scroll-btn-color);

  &:not(:disabled, [aria-disabled="true"]):hover,
  &:not(:disabled, [aria-disabled="true"]):focus-visible,
  &:not(:disabled, [aria-disabled="true"]):focus,
  &:not(:disabled, [aria-disabled="true"]).focus-visible {
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
  min-width: 100%;
  font-size: 1rem;
  color: #313333;
  border-collapse: collapse;
`;
export const Header = styled.th`
  height: var(--table-header-height);
  padding-inline: 1em;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  scroll-margin-inline: calc(1em + var(--table-border-width));
  background-color: var(--table-cell-bg);
  border: var(--table-border);
`;
export const Cell = styled.td`
  height: var(--table-header-height);
  padding: 1em;
  font-weight: normal;
  text-align: center;
  background-color: var(--table-cell-bg);
  border: var(--table-border);

  @media only print {
    padding: 0;
  }
`;
export const Caption = styled.caption`
  margin-block-start: 1em;
  font-size: 80%;
  text-align: left;
  caption-side: bottom;
`;
