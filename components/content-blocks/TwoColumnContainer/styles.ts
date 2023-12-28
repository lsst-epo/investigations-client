"use client";
import styled from "styled-components";
import { BREAK_TABLET } from "@/styles/globalStyles";

export const LeftCol = styled.div`
  display: block;

  > * + * {
    margin-block-start: var(--content-block-margin);
  }
`;

export const RightCol = styled.div`
  display: block;

  > * + * {
    margin-block-start: var(--content-block-margin);
  }
`;

export const TwoColContainer = styled.section`
  display: block;

  @media (min-width: ${BREAK_TABLET}) {
    display: flex;
    justify-content: space-between;
  }

  ${LeftCol}, ${RightCol} {
    @media (min-width: ${BREAK_TABLET}) {
      width: calc(50% - 20px);
    }
  }
`;
