"use client";
import styled from "styled-components";
import { BREAK_TABLET } from "@/styles/globalStyles";

export const NavHeader = styled.div`
  --header-height: 95px;

  background-color: var(--turquoise90);
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  height: var(--header-height);
  min-height: 60px;

  & > img {
    height: 100%;
    width: auto;
  }

  @media screen and (max-width: ${BREAK_TABLET}) {
    height: auto;
    min-height: 60px;
  }
`;