"use client";
import styled from "styled-components";
import { token } from "@rubin-epo/epo-react-lib/styles";

export const ReviewListItem = styled.li`
  --review-item-padding: 1em;
  background-color: var(--review-background-color);
  border-radius: 10px;
  padding: var(--review-item-padding);

  @container review-list (min-width: ${token("BREAK_TABLET_MIN")}) {
    --review-item-padding: 2em;
  }

  @media print {
    --review-item-padding: 0;
  }
`;
