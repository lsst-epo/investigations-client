import { FunctionComponent } from "react";
import { graphql } from "@/gql/public-schema";

const Fragment = graphql(`
  fragment TableBlock on contentBlocks_table_BlockType {
    id
    caption
    id
    displayTable {
      tableRow {
        {
          id
          cellContent
        }
      }
    }
  }
`);

const TableContentBlock: FunctionComponent = () => {
  return <></>;
};

TableContentBlock.displayName = "ContentBlock.Table";

export default TableContentBlock;
