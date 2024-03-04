"use client";
import styled from "styled-components";
import { TextInput as BaseTextInput } from "../../SimpleQuestion/Text/styles";

export const TextInput = styled(BaseTextInput)`
  --input-background-color: var(--white, #fff);

  margin: 0;
  min-width: 20ch;

  &:read-only {
    --input-background-color: transparent;
    --input-border-color: var(--neutral60, #6a6e6e);

    cursor: default;

    &:focus {
      outline: none;
    }
  }
`;
