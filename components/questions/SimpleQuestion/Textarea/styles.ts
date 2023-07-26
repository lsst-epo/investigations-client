"use client";
import styled from "styled-components";
import Input from "@/components/form/Input";

export const Textarea = styled(Input)`
  --input-background-color: var(--question-background-color);
  --input-border-color: var(--question-border-color);
  --input-color: var(--question-input-color);

  &:disabled {
    --input-background-color: #f5f5f5;
    --input-border-color: #6a6e6e;
  }
`;
