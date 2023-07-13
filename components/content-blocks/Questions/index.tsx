import { FunctionComponent } from "react";
import QuestionFactory, {
  QuestionProps,
} from "@/components/factories/QuestionFactory";
import * as Styled from "./styles";
const QuestionsContentBlock: FunctionComponent = () => {
  const isInteraction = true;
  const questions: QuestionProps[] = [];

  return (
    <Styled.QuestionList
      style={{
        "--list-background-color": isInteraction && "#E6FFE6",
        "--list-padding": isInteraction && "var(--PADDING_SMALL, 20px)",
      }}
    >
      {questions.map((question) => (
        <QuestionFactory key={question.id} {...question} />
      ))}
    </Styled.QuestionList>
  );
};

QuestionsContentBlock.displayName = "ContentBlock.Questions";

export default QuestionsContentBlock;
