import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { isNullish, notNull } from "@/lib/utils";
import { Option } from "@/components/shapes/option";
import Table from "@/components/layout/Table";
import { buildHeader, buildRows } from "@/components/layout/Table/helpers";

const Fragment = graphql(`
  fragment TableRows on questions_default_Entry {
    id
    rows: questionTable {
      ... on questionTable_BlockType {
        cells: tableCell {
          ... on tableCell_question_BlockType {
            id
            questionType
            options {
              ... on options_BlockType {
                label: optionLabel
                value: optionValue
              }
            }
          }
          ... on tableCell_static_BlockType {
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
                    questionType
                    options {
                      ... on options_BlockType {
                        label: optionLabel
                        value: optionValue
                      }
                    }
                  }
                  ... on tableCell_static_BlockType {
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
  options?: Array<Option>;
}

interface QuestionTableProps {
  data: FragmentType<typeof Fragment>;
  locale: string;
  className?: string;
}

export interface Cell {
  __typename: string;
  id: string;
  equation?: string;
  text?: string;
  questionType?: "text" | "select";
  header?: boolean;
  options?: Array<Option>;
}

const getOverflowPadding = (
  rows: Array<{ cells: Array<Cell>; previousQuestion: Array<any> }> = []
) => {
  const rowHeight = 5;
  const itemHeight = 2;
  const tableHeight = rowHeight * rows.length;
  /**  */
  const dropdownStartPosition = Math.ceil(rowHeight / 2 + itemHeight / 2);

  /** the largest set of options in each row */
  const largestOptions = rows.map(({ cells }) =>
    cells.reduce((prev, { options = [] }) => {
      return options.length > prev ? options.length : prev;
    }, 0)
  );

  /** the height each row extends beyond the end of the table */
  const totalHeight = largestOptions.map((o, i) => {
    const startingPosition = i * rowHeight + dropdownStartPosition;
    const itemsHeight = o * itemHeight;
    return Math.max(startingPosition + itemsHeight - tableHeight, 0);
  });

  const largest = Math.max(...totalHeight);

  return `calc(${largest}em  - calc(var(--table-border-width) * 2))`;
};

const QuestionTable: FunctionComponent<QuestionTableProps> = async ({
  data,
  className,
}) => {
  const { rows: rawRows, id } = useFragment(Fragment, data);

  if (isNullish(rawRows) || isNullish(id)) return null;

  const rawHeader = rawRows.shift();

  const header = isNullish(rawHeader) ? [] : buildHeader(rawHeader.cells);
  const filteredRows = rawRows.filter(notNull);
  const rows = isNullish(rawRows) ? [] : buildRows(filteredRows, id);
  const overflowPadding = getOverflowPadding(filteredRows);

  return <Table {...{ header, rows, className, overflowPadding }} />;
};

QuestionTable.displayName = "Questions.Tabular.Table";

export default QuestionTable;
