"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import useQuestions from "@/contexts/Questions";
import * as Styled from "./styles";

interface QuestionNumberProps {
  id: string;
  direction?: "inline" | "block";
  className?: string;
}

const QuestionNumber: FunctionComponent<
  PropsWithChildren<QuestionNumberProps>
> = ({ id, direction = "block", className, children }) => {
  const questions = useQuestions();

  const maxIndex = questions.byAll.length - 1;
  const questionIndex = questions.byAll.findIndex(
    (question) => question.id === id
  );

  return (
    <Styled.Number
      value={questionIndex + 1}
      data-direction={direction}
      className={className}
      style={{ zIndex: maxIndex - questionIndex }}
    >
      {children}
    </Styled.Number>
  );
};

QuestionNumber.displayName = "Questions.Number";

export default QuestionNumber;
