import { ComponentType, FunctionComponent } from "react";
import { QuestionCategory } from "@/components/shapes/questions";
import InlineQuestion from "@/components/questions/InlineQuestion";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";

export interface QuestionProps {
  id: string;
  category: QuestionCategory;
  config: any;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  simple: SimpleQuestion,
  inline: InlineQuestion,
  tabular: TabularQuestion,
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
