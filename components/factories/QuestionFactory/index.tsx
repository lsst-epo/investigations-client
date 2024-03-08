import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";
import InlineQuestion from "@/components/questions/InlineQuestion";
import { AnswerType } from "@/types/questions";
import CalculatorQuestion from "@/components/questions/Calculator";

const Fragment = graphql(`
  fragment QuestionEntry on questions_default_Entry {
    __typename
    id
    answerType
    questionText
    widgetInstructions
    ...CalculatorQuestion
    ...TabularQuestion
    options: answerOptions {
      ... on answerOptions_option_BlockType {
        label: optionLabel
        value: optionValue
      }
    }
    questionWidgetsBlock {
      __typename
      ...ColorFilterToolQuestion
      ...SourceSelectorQuestion
      ...LightCurveQuestion
    }
    parts: multiPartBlocks {
      ... on multiPartBlocks_select_BlockType {
        id
        type: typeHandle
        options: answerOptions {
          ... on answerOptions_option_BlockType {
            id
            label: optionLabel
            value: optionValue
          }
        }
      }
      ... on multiPartBlocks_text_BlockType {
        id
        type: typeHandle
      }
      ... on multiPartBlocks_multiselect_BlockType {
        id
        type: typeHandle
        options: answerOptions {
          ... on answerOptions_option_BlockType {
            id
            label: optionLabel
            value: optionValue
          }
        }
      }
      ... on multiPartBlocks_readonlyText_BlockType {
        id
        type: typeHandle
        text: questionText
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
  widget: SimpleQuestion,
  calculator: CalculatorQuestion,
  textarea: SimpleQuestion,
  multiPart: InlineQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = ({
  data,
  locale,
}) => {
  const {
    answerType: type,
    id,
    questionWidgetsBlock = [],
    options,
    questionText,
    widgetInstructions,
    parts = [],
    equation,
  } = useFragment(Fragment, data);

  if (!id || !type) return null;

  const Question = QUESTION_MAP[type];

  if (!Question) return null;

  const widgetConfig =
    questionWidgetsBlock && questionWidgetsBlock.length > 0
      ? questionWidgetsBlock[0]
      : {};

  return (
    <Question
      questionText={questionText || widgetInstructions}
      {...{ data, id, type, options, widgetConfig, parts, locale, equation }}
    />
  );
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
