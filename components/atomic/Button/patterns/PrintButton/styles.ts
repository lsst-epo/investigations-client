"use client";
import styled from "styled-components";
import Button from "@rubin-epo/epo-react-lib/Button";

export const PrintButton = styled(Button)`
  --button-text-align: left;

  @media only print {
    display: none;
  }
`;
