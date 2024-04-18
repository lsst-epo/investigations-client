import Equation from "@/components/atomic/Equation";
import { Option } from "@/components/shapes/option";
import { TableCell, TableHeader, TableRow } from ".";
import { ComponentType } from "react";
import { QuestionTableInputProps } from "@/components/questions/TabularQuestion/Table";
import TextQuestionCell from "@/components/questions/TabularQuestion/Text";
import SelectQuestionCell from "@/components/questions/TabularQuestion/Select";
import type {
  NumberQuestion,
  Tabular,
  Text,
  Textarea,
} from "@/types/questions";
import ReadOnlyCell from "@/components/questions/TabularQuestion/ReadOnly";

export interface Cell {
  __typename?: string | null;
  id: string | null;
  equation: string | null;
  text: string | null;
  answerType?: Text | Textarea | NumberQuestion | Tabular;
  options?: Array<Option>;
}

export interface HeaderCell {
  id: string | null;
  equation: string | null;
  text: string | null;
}

const QuestionsMap: Record<string, ComponentType<QuestionTableInputProps>> = {
  text: TextQuestionCell,
  select: SelectQuestionCell,
};

const buildStaticCell = (
  { id, equation, text }: Cell,
  isHeader = false
): TableCell => {
  const children = equation ? <Equation latex={equation} /> : text;

  return { id: id || undefined, children, isHeader };
};

export const buildHeader = (cells: Array<HeaderCell> = []): TableHeader =>
  cells.map((cell) => buildStaticCell(cell, true));

const buildQuestionCell = (
  cell: Cell,
  questionId: string,
  readOnly = false
): TableCell => {
  const { id, answerType, options } = cell;

  if (!id) return {};

  if (readOnly) {
    return {
      id,
      children: <ReadOnlyCell {...{ id, questionId, options }} />,
    };
  } else {
    const Question = answerType && QuestionsMap[answerType];

    return {
      id,
      children: Question ? (
        <Question {...{ id, questionId, options }} />
      ) : undefined,
    };
  }
};

export const buildPreviousQuestions = (questions: Array<any> = []) => {
  const previousQuestions = questions.map(({ rows, id, answerType }) => {
    if (answerType === "tabular") {
      return buildRows(rows.slice(-1), id, true).flat();
    }

    return [buildQuestionCell({ id, answerType }, id, true)];
  });

  return previousQuestions.flat();
};

export const buildRows = (
  rows: Array<{ cells: Array<Cell>; previousQuestion?: Array<any> }>,
  questionId: string,
  readOnly = false
): TableRow => {
  return rows.map(({ cells = [], previousQuestion = [] }) => {
    const currentCells = cells.map(({ __typename, ...props }, i) => {
      switch (__typename) {
        case "tableRow_rowHeader_BlockType":
          return buildStaticCell(props, i === 0);
        case "tableCell_rowHeader_BlockType":
          return buildStaticCell(props, i === 0);
        case "tableCell_question_BlockType":
          return buildQuestionCell(props, questionId, readOnly);
        default:
          return buildStaticCell(props);
      }
    });

    const previousCells = buildPreviousQuestions(previousQuestion);

    return [...previousCells, ...currentCells];
  });
};
