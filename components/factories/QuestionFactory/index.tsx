import { ComponentType, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import SimpleQuestion from "@/components/questions/SimpleQuestion";
import TabularQuestion from "@/components/questions/TabularQuestion";
import InlineQuestion from "@/components/questions/InlineQuestion";

const Fragment = graphql(`
  fragment QuestionEntry on questions_default_Entry {
    __typename
    id
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
          ...ColorFilterToolEntry
        }
      }
      ... on questionWidgetsBlock_sourceSelectorBlock_BlockType {
        typeHandle
        sourceSelector {
          ...SourceSelectorEntry
        }
      }
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
}

const QUESTION_MAP: Record<string, ComponentType<any>> = {
  text: SimpleQuestion,
  select: SimpleQuestion,
  tabular: TabularQuestion,
  widget: SimpleQuestion,
  textarea: SimpleQuestion,
  multiPart: InlineQuestion,
};

const QuestionFactory: FunctionComponent<QuestionProps> = ({ ...props }) => {
  const {
    answerType: type,
    id,
    questionWidgetsBlock = [],
    options,
    questionText,
    widgetInstructions,
    parts = [],
  } = useFragment(Fragment, props.data);

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
      {...{ id, type, options, widgetConfig, parts }}
    />
  );
};

QuestionFactory.displayName = "Factory.Question";

export default QuestionFactory;
