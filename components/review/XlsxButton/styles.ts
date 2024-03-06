"use client";
import styled from "styled-components";
import Button from "@rubin-epo/epo-react-lib/Button";

export const ExportButton = styled(Button)`
  --button-text-align: left;

  @media only print {
    display: none;
  }
`;
