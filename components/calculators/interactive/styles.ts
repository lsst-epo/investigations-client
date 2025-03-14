"use client";
import { token } from "@rubin-epo/epo-react-lib/styles";
import styled from "styled-components";

export const MathContainer = styled.div`
  --math-gap: 0.5em;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr 1fr;
  gap: var(--math-gap);
  justify-items: left;
  min-width: 50%;

  @container (min-width: ${token("BREAK_MOBILE_MIN")}) {
    font-size: 125%;
  }

  @container (min-width: ${token("BREAK_TABLET_MIN")}) {
    font-size: 150%;
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

export const LiveRegion = styled.output`
  position: absolute;
  top: auto;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
