"use client";
import { BaseContentBlockProps } from "@/components/shapes";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import BaseComplexTable, {
  type ComplexTableRow,
} from "@rubin-epo/epo-react-lib/ComplexTable";
import { checkSitesForLocale } from "../helpers";

const Fragment = graphql(`
  fragment ComplexTableBlock on contentBlocks_complexTable_BlockType {
    id
    complexTable {
      ... on complexTable_BlockType {
        __typename
        id
        tableRow {
          ... on tableRow_tableCell_BlockType {
            __typename
            id
            cellWidth
            hasFlexibleCellWidth
            cellBackground
            cellContent
          }
        }
      }
    }
    sites
    verticalAlignment: verticalAlignnment
    plainText
  }
`);

interface Props extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

export default function ComplexTable(props: Props) {
  const { complexTable, sites, verticalAlignment, plainText } = useFragment(
    Fragment,
    props.data,
  );

  // Remove nulls from graphql data
  const rows = complexTable.reduce<ComplexTableRow[]>((rows, row) => {
    if (!row) return rows;

    const tableRow = row.tableRow.flatMap((cell) =>
      cell?.__typename === "tableRow_tableCell_BlockType" && cell.id
        ? {
            id: cell.id,
            cellContent: cell.cellContent ?? "",
            cellWidth: cell.cellWidth ?? undefined,
            hasFlexibleCellWidth: cell.hasFlexibleCellWidth ?? undefined,
            cellBackground: cell.cellBackground ?? undefined,
          }
        : [],
    );

    return tableRow.length ? [...rows, { tableRow }] : rows;
  }, []);

  const tableProps = {
    complexTable: rows,
    verticalAlignment: verticalAlignment ?? undefined,
    plainText: plainText ?? undefined,
  };

  const showTable = checkSitesForLocale(sites, props.locale);

  if (!showTable || !rows.length) return null;

  return <BaseComplexTable {...tableProps} />;
}
