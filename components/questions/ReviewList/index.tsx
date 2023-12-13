"use client";
import { FunctionComponent } from "react";
import ReviewFactory from "@/components/factories/ReviewFactory";
import { StoredQuestion } from "@/contexts/Questions";
import * as Styled from "./styles";
import { Answers } from "@/types/answers";

const ReviewList: FunctionComponent<{
  answers: Answers;
  questions: Array<StoredQuestion>;
}> = ({ answers, questions }) => {
  return (
    <Styled.ReviewList>
      {questions &&
        questions.map(({ id, answerType: type, ...config }, i) => {
          return (
            <ReviewFactory
              key={id}
              number={i + 1}
              value={answers[id]?.data}
              {...{ id, type, config }}
            />
          );
        })}
    </Styled.ReviewList>
  );
};

ReviewList.displayName = "Questions.ReviewList";

export default ReviewList;
