"use client";
import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Image as BaseImage } from "@rubin-epo/epo-react-lib";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";
import { BREAK_MOBILE, BREAK_DESKTOP } from "@/styles/globalStyles";

export const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: calc(100dvh - 80px);
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: stretch;
  justify-content: center;
`;

export const Image = styled(BaseImage)`
  max-width: ${fluidScale("300px", "150px", BREAK_DESKTOP, BREAK_MOBILE)};
`;
