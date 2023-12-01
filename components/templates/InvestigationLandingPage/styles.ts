"use client";
import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Image as BaseImage } from "@rubin-epo/epo-react-lib";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";
import { BREAK_MOBILE, BREAK_DESKTOP } from "@/styles/globalStyles";

export const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: calc(100dvh - 80px);
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 1em;
`;

export const Image = styled(BaseImage)`
  max-width: ${fluidScale("300px", "150px", BREAK_DESKTOP, BREAK_MOBILE)};
`;
