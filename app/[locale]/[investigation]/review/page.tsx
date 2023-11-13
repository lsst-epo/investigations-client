"use client";
import { FunctionComponent, useContext } from "react";
import { ReviewPageProps } from "./layout";
import ReviewFactory, {
  ReviewProps,
} from "@/components/factories/ReviewFactory";
import Input from "@/components/form/Input";
import * as Styled from "./styles";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import useQuestions from "@/contexts/Questions";

const ReviewPage: FunctionComponent<ReviewPageProps> = () => {
  const { answers } = useContext(StoredAnswersContext);
  const { byAll: questions } = useQuestions();
  const nameInputId = "name";

  return (
    <Styled.PageContainer>
      <h1>Great job! Let’s review your answers.</h1>
      <form>
        <Styled.NameLabel htmlFor={nameInputId}>
          Please enter your name
        </Styled.NameLabel>
        <Input type="text" id={nameInputId} />
      </form>
      <h2>Questions & Answers</h2>
      <Styled.ReviewList>
        {questions &&
          questions.map(({ id, answerType, ...question }, i) => {
            console.log({ questions });
            return (
              <ReviewFactory
                key={id}
                type={answerType}
                number={i + 1}
                value={answers[id]?.data}
                config={question}
                {...{ id }}
              />
            );
          })}
      </Styled.ReviewList>
    </Styled.PageContainer>
  );
};

export default ReviewPage;
