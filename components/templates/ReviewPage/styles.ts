"use client";

import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";

export const PageContainer = styled(Container)`
  & > * + * {
    margin-block-start: 1.5em;
  }
`;

export const ReviewLabel = styled.label`
  display: block;
  font-weight: var(--FONT_WEIGHT_EXTRA_BOLD, 800);
`;
