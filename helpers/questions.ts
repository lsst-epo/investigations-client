/* eslint-disable no-use-before-define */
import { Option } from "@/components/shapes/option";

type QuestionEntry = BaseQuestion &
  WidgetQuestion &
  MultipartQuestion &
  SelectQuestion &
  TabularQuestion;

interface BaseBlock {
  __typename: string;
}

interface QuestionBlock extends BaseBlock {
  questionEntries: Array<QuestionEntry>;
}

interface GroupBlock extends BaseBlock {
  group: Array<ContentBlock>;
}

interface Column extends BaseBlock {
  children: Array<ContentBlock>;
}

interface ColumnBlock extends BaseBlock {
  columns: [Column, Column];
}

type ContentBlock = QuestionBlock | GroupBlock | ColumnBlock | BaseBlock;

interface BaseQuestion {
  answerType: string;
  id: string;
  questionText: string;
}

interface TabularQuestion extends BaseQuestion {
  rows: Array<any>;
}

interface SelectQuestion extends BaseQuestion {
  options: Array<Option>;
}

interface WidgetQuestion extends Omit<BaseQuestion, "questionText"> {
  questionWidgetsBlock: Array<any>;
  widgetInstructions: string;
}

interface MultipartQuestion extends Omit<BaseQuestion, "questionText"> {
  parts: Array<any>;
}

export type StoredQuestion =
  | BaseQuestion
  | WidgetQuestion
  | MultipartQuestion
  | SelectQuestion
  | TabularQuestion;

function buildQuestion(question: QuestionEntry): StoredQuestion | undefined {
  const {
    answerType,
    id,
    parts,
    options,
    questionText,
    questionWidgetsBlock,
    widgetInstructions,
    rows,
  } = question;

  switch (answerType) {
    case "text":
      return { answerType, id, questionText };
    case "textarea":
      return { answerType, id, questionText };
    case "select":
      return { answerType, id, questionText, options };
    case "multiPart":
      return { answerType, id, parts };
    case "widget":
      return { answerType, id, widgetInstructions, questionWidgetsBlock };
    case "tabular":
      return { answerType, id, questionText, rows };
    default:
      break;
  }
}

function buildQuestionEntries(
  block: QuestionBlock
): Array<StoredQuestion | undefined> | undefined {
  const { questionEntries } = block;

  if (!questionEntries) {
    return undefined;
  }

  return questionEntries.map(buildQuestion);
}

const getTwoColQuestionEntries = (
  block: ColumnBlock
): Array<StoredQuestion | undefined> => {
  const { columns = [] } = block;

  const colBlocks = columns.map((col) => {
    const { children = [] } = col;
    return children;
  });

  return colBlocks
    .flat()
    .map((colBlock) => {
      const { __typename } = colBlock;

      if (__typename === "contentBlocks_questionBlock_BlockType") {
        return buildQuestionEntries(colBlock as QuestionBlock);
      }

      return undefined;
    })
    .flat();
};

const getQuestionEntries = (
  block: ContentBlock
): Array<StoredQuestion | undefined> => {
  const { __typename } = block;

  switch (__typename) {
    case "contentBlocks_questionBlock_BlockType": {
      return buildQuestionEntries(block as QuestionBlock) || [];
    }
    case "contentBlocks_twoColumnContainer_BlockType": {
      return getTwoColQuestionEntries(block as ColumnBlock);
    }
    case "contentBlocks_group_BlockType": {
      const { group } = block as GroupBlock;

      return getPageQuestionEntries(group).flat();
    }
    default: {
      return [];
    }
  }
};

export const getPageQuestionEntries = (blocks: Array<ContentBlock> = []) => {
  return blocks
    .map(getQuestionEntries)
    .flat()
    .filter((question): question is StoredQuestion => !!question);
};
