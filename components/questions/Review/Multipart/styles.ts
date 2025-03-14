"use client";
import styled from "styled-components";
import { ReviewListItem } from "../styles";

export const MultipartItem = styled(ReviewListItem)`
  > * + * {
    margin-inline-start: 1ch;
  }
`;

export const TextReview = styled.span`
  padding: 0;
  padding-inline: 1ch;
  color: var(--review-input-color);
  white-space: nowrap;
  background-color: var(--review-input-background-color);
  border: 1px solid var(--review-input-border-color);
  border-radius: 5px;

  @media print {
    padding-inline: 0;
  }
`;
