"use client";
import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";

export const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: calc(100dvh - 80px);
`;

export const AuthWrapper = styled.div`
  display: flex;
  gap: 1em;
  align-items: stretch;
  justify-content: center;
`;