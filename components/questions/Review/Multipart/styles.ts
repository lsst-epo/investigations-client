"use client";
import styled from "styled-components";
import { ReviewListItem } from "../styles";

export const MultipartItem = styled(ReviewListItem)`
  > * + * {
    margin-inline-start: 1ch;
  }
`;

export const TextReview = styled.span`
  background-color: var(--review-input-background-color);
  border: 1px solid var(--review-input-border-color);
  border-radius: 5px;
  color: var(--review-input-color);
  padding: 0;
  padding-inline: 1ch;
  white-space: nowrap;

  @media print {
    padding-inline: 0;
  }
`;
