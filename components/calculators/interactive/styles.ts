"use client";
import Input from "@/components/form/Input";
import styled from "styled-components";

export const MathInput = styled(Input)`
  --input-background-color: var(--white, #fff);
  display: inline-block;
  font-family: var(--FONT_STACK_BASE);
  font-size: 0.75em;
  margin: 0;
  width: auto;
  text-align: center;
`;

export const CondensedMathInput = styled(MathInput)`
  height: 2em;
`;

export const MathOutput = styled(MathInput)`
  &:read-only {
    --input-background-color: var(--neutral10, #f5f5f5);
    --input-border-color: var(--neutral60, #6a6e6e);

    cursor: default;

    &:focus {
      outline: none;
    }
  }
`;
