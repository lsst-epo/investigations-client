"use client";
import { FunctionComponent, useContext } from "react";
import ReviewFactory from "@/components/factories/ReviewFactory";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import useQuestions from "@/contexts/Questions";
import * as Styled from "./styles";

const ReviewList: FunctionComponent = () => {
  const { answers } = useContext(StoredAnswersContext);
  const { byAll: questions } = useQuestions();
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
