import { FunctionComponent, ReactNode } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import Table from "@/components/layout/Table";
import Equation from "@/components/atomic/Equation";
import { notNull } from "@/lib/utils";

const Fragment = graphql(`
  fragment TableRows on questions_default_Entry {
    id
    rows: questionTable {
      ... on questionTable_BlockType {
        id
        tableCell {
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
`);

interface QuestionTableProps {
  data: FragmentType<typeof Fragment>;
}

const buildHeader = (
  headerCells: Array<any>
): Array<{ id: string; children?: ReactNode }> => {
  return headerCells.map(({ id, equation, text }) => {
    if (text) {
      return { id, children: text };
    }

    if (equation) {
      const children = <Equation latex={equation} />;

      return { id, children };
    }

    return { id };
  });
};

const buildRows = (rowCells: Array<any>) => {};

const QuestionTable: FunctionComponent<QuestionTableProps> = async ({
  data,
}) => {
  const { rows: rawRows, id } = useFragment(Fragment, data);
  const rawHeader = rawRows.shift();

  if (!notNull(rawHeader)) return null;

  const header = buildHeader(rawHeader.tableCell);

  return <Table {...{ header, rows: [] }} />;
};

QuestionTable.displayName = "Questions.Tabular.Table";

export default QuestionTable;
