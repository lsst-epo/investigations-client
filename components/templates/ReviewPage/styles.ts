"use client";

import styled from "styled-components";
import Container from "@rubin-epo/epo-react-lib/Container";
import Input from "@/components/form/Input";

export const PageContainer = styled(Container)`
  & > * + * {
    margin-block-start: 1.5em;
  }
`;

export const DisplayTitle = styled.span`
  @media only print {
    display: none;
  }
`;

export const PrintTitle = styled.span`
  @media only screen {
    display: none;
  }
`;

export const NameLabel = styled.label`
  font-weight: var(--FONT_WEIGHT_EXTRA_BOLD, 800);

  @media only print {
    display: none;
  }
`;

export const NameInput = styled(Input)`
  @media only print {
    --input-background-color: var(--white, #fff);
    --input-border-color: transparent;
    padding: 0;
  }
`;
