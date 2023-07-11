import SimpleQuestion, {
  SimpleQuestionProps,
} from "@/components/questions/SimpleQuestion";
import { FunctionComponent } from "react";

export interface QuestionProps {
  id: string;
  category: "simple" | "inline" | "widget" | "tabular";
  config: Omit<SimpleQuestionProps, "id">;
}

const questionTypes = { simple: SimpleQuestion };

const QuestionFactory: FunctionComponent<QuestionProps> = ({
  id,
  category,
  config,
}) => {
  const Question = questionTypes[category];

  if (!Question) {
    return null;
  }

  return <Question {...{ ...config, id }} />;
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
