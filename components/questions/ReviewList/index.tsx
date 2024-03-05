import { FunctionComponent } from "react";
import ReviewFactory from "@/components/factories/ReviewFactory";
import { StoredQuestion } from "@/helpers/questions";
import * as Styled from "./styles";

const ReviewList: FunctionComponent<{
  questions: Array<StoredQuestion>;
}> = ({ questions }) => {
  return (
    <Styled.ReviewList>
      {questions &&
        questions.map(({ id, answerType: type, ...config }, i) => {
          return (
            <ReviewFactory key={id} number={i + 1} {...{ id, type, config }} />
          );
        })}
    </Styled.ReviewList>
  );
};

ReviewList.displayName = "Questions.ReviewList";

export default ReviewList;
