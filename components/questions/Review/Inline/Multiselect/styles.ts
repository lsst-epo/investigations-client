"use client";
import styled from "styled-components";
import Select from "../Select";

export const SelectionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 0;
  margin-block-start: 1em;

  @media print {
    gap: 1ch;
  }
`;
export const SelectionText = styled(Select)`
  width: 100%;
`;
export const Selection = styled.li`
  &:not(:only-of-type) {
    ${SelectionText} {
      text-align: center;
    }
  }
`;
