import SimpleQuestion, {
  SimpleQuestionProps,
} from "@/components/questions/SimpleQuestion";
import { ComponentType, FunctionComponent } from "react";

export interface QuestionProps {
  id: string;
  category: "simple" | "inline" | "widget" | "tabular";
  config: Omit<SimpleQuestionProps, "id">;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  simple: SimpleQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = ({
  id,
  category,
  config,
}) => {
  const Question = QUESTION_MAP[category];

  if (!Question) {
    return null;
  }

  return <Question {...{ ...config, id }} />;
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
