"use client";
import Input from "@/components/form/Input";
import styled from "styled-components";

export const MathInput = styled(Input)`
  --input-background-color: var(--white, #fff);

  display: block;
  width: auto;
  margin: 0;
  font-family: var(--FONT_STACK_BASE);
  font-size: 0.75em;
  text-align: center;
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }
`;
