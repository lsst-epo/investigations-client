"use client";
import styled from "styled-components";

export const Body = styled.body`
  --scrollbar-width: calc(100vw - 100%);

  overflow-y: scroll;
`;

export const WideWidthContainer = styled.div`
  --max-page-width: 2000px;

  margin-inline: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: var(--max-page-width);
`;
