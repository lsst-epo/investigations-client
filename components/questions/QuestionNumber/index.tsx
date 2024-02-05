"use client";

import useQuestions from "@/contexts/Questions";
import { FunctionComponent, PropsWithChildren } from "react";

const QuestionNumber: FunctionComponent<
  PropsWithChildren<{ id: string; className?: string }>
> = ({ id, className, children }) => {
  const questions = useQuestions();

  const questionIndex = questions.byAll.findIndex(
    (question) => question.id === id
  );

  return (
    <li value={questionIndex + 1} className={className}>
      {children}
    </li>
  );
};

QuestionNumber.displayName = "Questions.Number";

export default QuestionNumber;
