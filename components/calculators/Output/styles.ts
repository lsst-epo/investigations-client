"use client";
import styled from "styled-components";

export const Output = styled.output`
  cursor: default;
  background-color: var(--neutral10, #f5f5f5);
  border: 1px solid var(--neutral60, #6a6e6e);
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 0.75em;
  text-align: center;
  height: 2em;
  padding-inline: 1ch;

  * {
    display: inline;
  }
`;
