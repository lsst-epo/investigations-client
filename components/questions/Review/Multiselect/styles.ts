"use client";
import styled from "styled-components";
import Text from "../Text";

export const SelectionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-block-start: 1em;
`;

export const SelectionText = styled(Text)`
  height: 100%;
  margin: 0;
  white-space: nowrap;
`;

export const Selection = styled.li`
  flex: 1 0 auto;
  min-width: 1rem;
  height: 2rem;

  &:not(:only-of-type) {
    ${SelectionText} {
      justify-content: center;
    }
  }
`;
