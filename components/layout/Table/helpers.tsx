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

interface RowConfig {
  readOnly?: boolean;
  suppressHeaders?: boolean;
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

const buildPreviousQuestion = ({ question }) => {
  const [{ id, answerType, rows }] = question;

  if (answerType === "tabular") {
    return buildRows(rows.slice(-1), id, {
      readOnly: true,
      suppressHeaders: true,
    }).flat();
  }

  return [buildQuestionCell({ id, answerType }, id, true)];
};

export const buildRows = (
  rows: Array<{ cells: Array<any> }>,
  questionId: string,
  config?: RowConfig
): Array<TableRow> => {
  const defaultConfig: RowConfig = { readOnly: false, suppressHeaders: false };
  const { readOnly, suppressHeaders } = {
    ...defaultConfig,
    ...config,
  };
  const tableRows: Array<TableRow> = [];

  rows.forEach(({ cells = [] }) => {
    const rowCells: TableRow = [];

    cells.forEach(({ __typename, ...props }, i) => {
      switch (__typename) {
        case "tableCell_previousQuestion_BlockType":
          rowCells.push(...buildPreviousQuestion(props));
          break;
        case "tableRow_previousQuestion_BlockType":
          rowCells.push(...buildPreviousQuestion(props));
          break;
        case "tableRow_rowHeader_BlockType":
          rowCells.push(
            buildStaticCell(props, suppressHeaders ? false : i === 0)
          );
          break;
        case "tableCell_rowHeader_BlockType":
          rowCells.push(
            buildStaticCell(props, suppressHeaders ? false : i === 0)
          );
          break;
        case "tableCell_question_BlockType":
          rowCells.push(buildQuestionCell(props, questionId, readOnly));
          break;
        default:
          rowCells.push(buildStaticCell(props));
          break;
      }
    });

    tableRows.push(rowCells);
  });
  return tableRows;
};
