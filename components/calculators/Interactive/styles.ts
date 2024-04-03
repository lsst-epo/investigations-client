"use client";
import styled from "styled-components";

export const MathContainer = styled.div`
  --math-gap: 0.5em;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr 1fr;
  gap: var(--math-gap);
  justify-items: left;
  min-width: 50%;
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
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
