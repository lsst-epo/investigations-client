"use client";
import { token } from "@rubin-epo/epo-react-lib/styles";
import styled from "styled-components";

export const MathContainer = styled.div`
  --math-gap: 0.5em;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--math-gap);
  justify-items: left;

  @container (min-width: ${token("BREAK_TABLET_MIN")}) {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    align-items: center;
  }
`;

export const Inputs = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--math-gap);
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
`;
