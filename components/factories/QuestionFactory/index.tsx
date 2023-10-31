import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";
import InlineQuestion from "@/components/questions/InlineQuestion";

const Fragment = graphql(`
  fragment QuestionFactory on questions_default_Entry {
    answerType
    options: answerOptions {
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
    multiPartBlocks {
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
  number: number;
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  text: SimpleQuestion,
  select: SimpleQuestion,
  tabular: TabularQuestion,
  widget: SimpleQuestion,
  textarea: SimpleQuestion,
  multiPart: InlineQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = ({
  number,
  ...props
}) => {
  const {
    answerType,
    id,
    questionWidgetsBlock = [],
    options,
    questionText,
    widgetInstructions,
    multiPartBlocks = [],
  } = useFragment(Fragment, props.data);

  if (!id || !answerType) return null;

  const Question = QUESTION_MAP[answerType];

  if (!Question) return null;

  return (
    <Question
      id={id}
      type={answerType}
      questionText={questionText || widgetInstructions}
      options={options}
      widgetConfig={questionWidgetsBlock[0] || {}}
      number={number}
      parts={multiPartBlocks}
    />
  );
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
