import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import Table from "@/components/layout/Table";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment TableBlock on contentBlocks_table_BlockType {
    id
    caption
    contentHeading
    displayTable {
      ... on displayTable_BlockType {
        tableRow {
          ... on tableRow_tableCell_BlockType {
            id
            cellContent
            rowHeader
          }
        }
      }
    }
  }
`);

interface TableContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

const TableContentBlock: FunctionComponent<TableContentBlockProps> = ({
  ...props
}) => {
  const {
    id,
    caption,
    contentHeading,
    displayTable = [],
  } = useFragment(Fragment, props.data);

  const buildRows = (
    rows: { tableRow: { cellContent?: string; rowHeader?: boolean }[] }[]
  ) => {
    return rows.map(({ tableRow }, i) => {
      return tableRow.map(({ cellContent = "", rowHeader = false }) => {
        return {
          children: cellContent,
          ...(i > 0 && { isHeader: rowHeader }),
        };
      });
    });
  };

  const rows = buildRows(Array.from(displayTable) as any);

  if (rows === null || rows.length === 0) {
    return null;
  }

  const header = rows.shift() || [];

  return (
    <Styled.TableContentBlock>
      {contentHeading && (
        <Styled.Heading id={`table-${id}-header`}>
          {contentHeading}
        </Styled.Heading>
      )}
      <Table
        {...{ id, caption, rows, header }}
        labelledById={contentHeading ? `table-${id}-header` : undefined}
      />
    </Styled.TableContentBlock>
  );
};

export default TableContentBlock;
