import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { isNullish, notNull } from "@/lib/utils";
import { Option } from "@/components/shapes/option";
import Table from "@/components/layout/Table";
import { buildHeader, buildRows } from "@/components/layout/Table/helpers";
import { TableRowsFragment } from "@/gql/public-schema/graphql";

const Fragment = graphql(`
  fragment TableRows on questions_default_Entry {
    id
    header: tableHeader {
      ... on tableHeader_BlockType {
        headerRow {
          ... on headerRow_tableCell_BlockType {
            id
            text
            equation
          }
        }
      }
    }
    rows: questionTable {
      ... on questionTable_BlockType {
        cells: tableCell {
          ... on tableCell_question_BlockType {
            id
            answerType: questionType
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
          }
          ... on tableCell_rowHeader_BlockType {
            id
            equation
            text
          }
          ... on tableCell_previousQuestion_BlockType {
            question {
              ... on questions_default_Entry {
                id
                answerType
                rows: questionTable {
                  ... on questionTable_BlockType {
                    cells: tableCell {
                      ... on tableCell_question_BlockType {
                        id
                        answerType: questionType
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
                      }
                      ... on tableCell_rowHeader_BlockType {
                        id
                        equation
                        text
                      }
                    }
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
  options?: Array<Option>;
}

interface QuestionTableProps {
  data: FragmentType<typeof Fragment>;
  locale: string;
  className?: string;
}

const getOverflowPadding = (rows: TableRowsFragment["rows"]) => {
  const rowHeight = 5;
  const itemHeight = 2;
  const tableHeight = rowHeight * rows.length;
  /**  */
  const dropdownStartPosition = Math.ceil(rowHeight / 2 + itemHeight / 2);

  /** the largest set of options in each row */
  const largestOptions = rows
    .map((row) => {
      if (notNull(row)) {
        return row.cells.reduce((prev, cell) => {
          if (cell?.__typename === "tableCell_question_BlockType") {
            return cell.options.length > prev ? cell.options.length : prev;
          }

          return prev;
        }, 0);
      }
    })
    .filter((o): o is number => typeof o !== "undefined");

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
  const { rows, header, id } = useFragment(Fragment, data);

  if (isNullish(id)) return null;

  const headerCells = header[0]?.headerRow.filter(notNull);
  const overflowPadding = getOverflowPadding(rows);

  return (
    <Table
      header={buildHeader(headerCells)}
      rows={buildRows(rows, id)}
      {...{ className, overflowPadding }}
    />
  );
};

QuestionTable.displayName = "Questions.Tabular.Table";

export default QuestionTable;
