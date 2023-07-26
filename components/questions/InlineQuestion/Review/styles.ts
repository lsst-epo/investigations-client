"use client";
import styled from "styled-components";
import { ReviewListItem } from "@/components/questions/SimpleQuestion/Review/styles";

export const ReviewListInlineItem = styled(ReviewListItem)`
  > * + * {
    margin-inline-start: 1ch;
  }
`;
