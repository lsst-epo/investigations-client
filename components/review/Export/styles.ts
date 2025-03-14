"use client";
import styled from "styled-components";
import Input from "@/components/form/Input";

export const NameInput = styled(Input)`
  margin-block-start: 0.5em;

  @media only print {
    --input-background-color: var(--white, #fff);
    --input-border-color: transparent;

    padding: 0;
  }
`;

export const ReviewLabel = styled.label`
  display: block;
  font-weight: var(--FONT_WEIGHT_EXTRA_BOLD, 800);
`;
