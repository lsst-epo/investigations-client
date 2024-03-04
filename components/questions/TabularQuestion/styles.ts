"use client";
import styled from "styled-components";
import BaseQuestionNumber from "../QuestionNumber";

export const QuestionNumber = styled(BaseQuestionNumber)`
  & > * + * {
    margin-block-start: var(--content-block-margin);
  }
`;
