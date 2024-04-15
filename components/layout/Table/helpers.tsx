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
  header: boolean | null;
  options?: Array<Option>;
}

const QuestionsMap: Record<string, ComponentType<QuestionTableInputProps>> = {
  text: TextQuestionCell,
  select: SelectQuestionCell,
};

const buildStaticCell = ({ id, equation, text, header }: Cell): TableCell => {
  const isHeader = !!header;
  if (text) {
    return { id: id || undefined, children: text, isHeader };
  }

  if (equation) {
    const children = <Equation latex={equation} />;

    return { id: id || undefined, children, isHeader };
  }

  return { id: id || undefined, isHeader };
};

export const buildHeader = (cells: Array<Cell> = []): TableHeader => {
  return cells.map(buildStaticCell);
};

const buildCell = (
  cell: Cell,
  questionId: string,
  readOnly = false
): TableCell => {
  const { id, answerType, options } = cell;

  if (answerType && id) {
    if (readOnly) {
      return {
        id: id || undefined,
        children: <ReadOnlyCell {...{ id, questionId }} />,
      };
    } else {
      const Question = answerType && QuestionsMap[answerType];

      if (!Question) return { id: id || undefined };

      return {
        id: id || undefined,
        children: <Question {...{ id, questionId, options }} />,
      };
    }
  }

  return buildStaticCell(cell);
};

export const buildPreviousQuestions = (questions = []) => {
  const questionCells: Array<TableCell> = [];

  questions.forEach(({ answerType, id, rows = [] }) => {
    if (answerType === "tabular") {
      questionCells.push(
        ...rows
          .slice(1)
          .map(({ cells }) => cells.map((cell) => buildCell(cell, id, true)))
          .flat()
      );
    } else {
      questionCells.push(buildCell({ answerType, id }, id, true));
    }
  });

  return questionCells;
};

export const buildRows = (
  rows: Array<{ cells: Array<Cell>; previousQuestion?: Array<any> }>,
  questionId: string,
  readOnly = false
): TableRow => {
  const parsedRows: TableRow = [];

  rows.forEach(({ cells = [], previousQuestion = [] }) => {
    if (previousQuestion.length > 0) {
      parsedRows.push(buildPreviousQuestions(previousQuestion));
    } else {
      parsedRows.push(
        cells.map((cell) => buildCell(cell, questionId, readOnly))
      );
    }
  });

  return parsedRows;
};
