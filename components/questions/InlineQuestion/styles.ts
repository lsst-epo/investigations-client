"use client";
import styled from "styled-components";
import QuestionNumber from "../QuestionNumber";

export const InlineContainer = styled(QuestionNumber)`
  > * + * {
    margin: 0;
    margin-inline-start: 0.5ch;
  }
`;
