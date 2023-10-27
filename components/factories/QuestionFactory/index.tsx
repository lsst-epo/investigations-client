import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";

const Fragment = graphql(`
  fragment QuestionFactory on questions_default_Entry {
    answerType
    answerOptions {
      ... on answerOptions_option_BlockType {
        label: optionLabel
        value: optionValue
      }
    }
    id
    questionText
    widgetInstructions
    questionWidgetsBlock {
      __typename
      ... on questionWidgetsBlock_colorFilterToolBlock_BlockType {
        typeHandle
        colorFilterTool {
          ...ColorFilterToolBlock
        }
      }
    }
  }
`);

export interface QuestionProps {
  data: FragmentType<typeof Fragment>;
  number: number;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  text: SimpleQuestion,
  select: SimpleQuestion,
  tabular: TabularQuestion,
  widget: SimpleQuestion,
  textarea: SimpleQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = ({
  number,
  ...props
}) => {
  const {
    answerType,
    id,
    questionWidgetsBlock = [],
    answerOptions,
    questionText,
    widgetInstructions,
  } = useFragment(Fragment, props.data);

  if (!id || !answerType) return null;

  const Question = QUESTION_MAP[answerType];

  if (!Question) return null;

  return (
    <Question
      id={id}
      type={answerType}
      questionText={questionText || widgetInstructions}
      options={answerOptions}
      widgetConfig={questionWidgetsBlock[0] || {}}
      number={number}
    />
  );
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
