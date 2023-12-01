"use client";
import styled from "styled-components";
import Button from "@rubin-epo/epo-react-lib/Button";

export const SignUp = styled(Button)`
  --button-background-color: transparent;
  --button-border-color: transparent;
  --button-color: var(--turquoise85);

  &:not(:disabled):hover,
  &:not(:disabled):active,
  &:not(:disabled):focus-within {
    text-decoration: underline;
  }
`;
