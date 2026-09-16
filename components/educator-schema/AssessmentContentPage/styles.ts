"use client";
import styled from "styled-components";
import { fluidScale, layoutGrid } from "@rubin-epo/epo-react-lib/styles";
import { tokens } from "@rubin-epo/epo-react-lib";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: var(--title-margin);
`;

export const Title = styled.h1`
  --title-margin: ${fluidScale("2em", "1em")};
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: stretch;
  justify-content: center;
`;

export const SiblingNav = styled.nav`
  ${layoutGrid(2, "1rem", "1rem", tokens.BREAK_MOBILE)}

  a:last-child {
    grid-column: 1 / -1;
  }
`;