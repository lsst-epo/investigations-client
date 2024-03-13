"use client";
import styled from "styled-components";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const CalculatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 100%;
  color: var(--neutral95, #1f2121);

  @container (min-width: ${token("BREAK_MOBILE_MIN")}) {
    font-size: 125%;
  }

  @container (min-width: ${token("BREAK_TABLET_MIN")}) {
    font-size: 150%;
  }
`;
