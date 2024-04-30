import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { AnswerType } from "@/types/questions";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";
import MultipartQuestion from "@/components/questions/MultipartQuestion";
import CalculatorQuestion from "@/components/questions/Calculator";
import WidgetQuestion from "@/components/questions/Widget";
import NumberQuestion from "@/components/questions/Number";

const Fragment = graphql(`
  fragment QuestionEntry on questions_default_Entry {
    __typename
    id
    answerType
    questionText
    ...CalculatorQuestion
    ...TabularQuestion
    ...WidgetQuestion
    ...NumberQuestion
    ...MultipartQuestion
    options: answerOptions {
      ... on answerOptions_option_BlockType {
        label: optionLabel
        value: optionValue
      }
    }
  }
`);

export interface QuestionProps {
  data: FragmentType<typeof Fragment>;
  locale: string;
}

const QUESTION_MAP: Record<AnswerType, ComponentType<any>> = {
  text: SimpleQuestion,
  select: SimpleQuestion,
  tabular: TabularQuestion,
  widget: WidgetQuestion,
  calculator: CalculatorQuestion,
  textarea: SimpleQuestion,
  multiPart: MultipartQuestion,
  number: NumberQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = ({
  data,
  locale,
}) => {
  const {
    answerType: type,
    id,
    questionText,
    ...restProps
  } = useFragment(Fragment, data);

  if (!id || !type) return null;

  const Question = QUESTION_MAP[type];

  if (!Question) return null;

  return (
    <Question {...{ data, id, type, questionText, locale, ...restProps }} />
  );
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
