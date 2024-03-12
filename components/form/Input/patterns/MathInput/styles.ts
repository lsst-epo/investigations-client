"use client";
import Input from "@/components/form/Input";
import styled from "styled-components";

export const MathInput = styled(Input)`
  --input-background-color: var(--white, #fff);
  -moz-appearance: textfield;
  display: block;
  font-family: var(--FONT_STACK_BASE);
  font-size: 0.75em;
  margin: 0;
  width: auto;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const CondensedMathInput = styled(MathInput)`
  height: 2em;
`;

export const Placeholder = styled.div`
  display: block;
`;
