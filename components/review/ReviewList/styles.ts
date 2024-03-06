"use client";
import styled from "styled-components";

export const ReviewList = styled.ol`
  --review-color: #34706d;
  --review-background-color: var(--turquoise10, #d9f7f6);
  --review-input-border-color: var(--neutral60, #6b6e6e);
  --review-input-background-color: var(--white, #fff);
  --review-input-color: var(--neutral60, #6b6e6e);

  background-color: var(--list-background-color, transparent);
  color: var(--review-color);
  container: review-list / inline-size;
  list-style-type: decimal;
  list-style-position: inside;
  padding: var(--list-padding, 0);

  & > li + li {
    margin-block-start: 0.5em;
  }

  @media print {
    --review-color: #34706d;
    --review-background-color: transparent;
    --review-input-border-color: transparent;
    --review-input-background-color: var(--white, #fff);
    --review-input-color: var(--black, #000);
  }
`;
