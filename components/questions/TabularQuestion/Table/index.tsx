import { ComponentType, FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { isNullish } from "@/lib/utils";
import Table from "@/components/layout/Table";
import Equation from "@/components/atomic/Equation";
import Text from "../Text";
import Select from "../Select";
import {
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/layout/Table/Table";

const Fragment = graphql(`
  fragment TableRows on questions_default_Entry {
    id
    rows: questionTable {
      ... on questionTable_BlockType {
        cells: tableCell {
          ... on tableCell_question_BlockType {
            id
            answerType
          }
          ... on tableCell_text_BlockType {
            id
            equation
            text
            header
          }
        }
        previousQuestion {
          ... on questions_default_Entry {
            id
            rows: questionTable {
              ... on questionTable_BlockType {
                cells: tableCell {
                  ... on tableCell_question_BlockType {
                    id
                    answerType
                  }
                  ... on tableCell_text_BlockType {
                    id
                    equation
                    text
                    header
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export interface QuestionTableInputProps {
  id: string;
  questionId: string;
  readOnly?: boolean;
}

interface QuestionTableProps {
  data: FragmentType<typeof Fragment>;
  locale: string;
  className?: string;
}

const QuestionsMap: Record<string, ComponentType<QuestionTableInputProps>> = {
  text: Text,
  select: Select,
};

const buildStaticCell = ({ id, equation, text, header }): TableCell => {
  const isHeader = !!header;
  if (text) {
    return { id, children: text, isHeader };
  }

  if (equation) {
    const children = <Equation latex={equation} />;

    return { id, children, isHeader };
  }

  return { id, isHeader };
};

const buildHeader = (cells: Array<any>): TableHeader => {
  return cells.map(buildStaticCell);
};

const buildCell = (
  cell: {
    __typename: string;
    id: string;
    equation?: string;
    text?: string;
    answerType?: "text" | "select";
    header?: boolean;
  },
  questionId: string,
  readOnly = false
) => {
  const { __typename, id, equation, text, answerType, header } = cell;

  if (__typename === "tableCell_question_BlockType") {
    const Question = answerType && QuestionsMap[answerType];

    if (!Question) return { id };

    return { id, children: <Question {...{ id, questionId, readOnly }} /> };
  }

  if (__typename === "tableCell_text_BlockType") {
    return buildStaticCell({ id, equation, text, header });
  }

  return {};
};

const buildCells = (cells: Array<any>, questionId: string, readOnly = false) =>
  cells.map((cell) => buildCell(cell, questionId, readOnly));

const buildRows = (
  rows: Array<any>,
  questionId: string,
  readOnly = false
): TableRow => {
  return rows.map(({ cells = [], previousQuestion = [] }) => {
    if (previousQuestion && previousQuestion.length > 0) {
      const [{ id, rows }] = previousQuestion;

      return buildRows(rows.slice(1), id, true).flat();
    } else {
      return buildCells(cells, questionId, readOnly);
    }
  });
};

const QuestionTable: FunctionComponent<QuestionTableProps> = async ({
  data,
  className,
}) => {
  const { rows: rawRows, id } = useFragment(Fragment, data);

  if (isNullish(rawRows) || isNullish(id)) return null;

  const rawHeader = rawRows.shift();

  const header = isNullish(rawHeader) ? [] : buildHeader(rawHeader.cells);
  const rows = isNullish(rawRows) ? [] : buildRows(rawRows, id);

  console.log({ header, rows });

  return <Table {...{ header, rows, className }} />;
};

QuestionTable.displayName = "Questions.Tabular.Table";

export default QuestionTable;
