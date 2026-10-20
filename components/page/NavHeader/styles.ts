"use client";
import styled from "styled-components";
import { BREAK_TABLET } from "@/styles/globalStyles";

export const NavHeader = styled.div`
  --header-height: 95px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: var(--header-height);
  color: white;
  background-color: var(--turquoise90);

  @media (max-width: ${BREAK_TABLET}) {
    height: auto;
    min-height: 60px;
  }

  & > img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;
