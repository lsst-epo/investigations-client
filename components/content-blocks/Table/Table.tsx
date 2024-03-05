import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import Table from "@/components/layout/Table";
import { BaseContentBlockProps } from "@/components/shapes";
import { isNullish, notNull } from "@/lib/utils";
import * as Styled from "./styles";
import { buildHeader, buildRows } from "@/components/layout/Table/helpers";

const Fragment = graphql(`
  fragment TableBlock on contentBlocks_table_BlockType {
    id
    caption
    contentHeading
    rows: displayTable {
      ... on displayTable_BlockType {
        cells: tableRow {
          ... on tableRow_tableCell_BlockType {
            id
            text: cellContent
            header: rowHeader
            equation
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

const TableContentBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data }) => {
  const {
    id,
    caption,
    contentHeading,
    rows: rawRows = [],
  } = useFragment(Fragment, data);

  if (isNullish(rawRows) || isNullish(id)) return null;

  const { cells: headerCells = [] } = rawRows.shift() || {};

  const header = buildHeader(headerCells?.filter(notNull));
  const filteredRows = rawRows.filter(notNull);
  const rows = isNullish(rawRows) ? [] : buildRows(filteredRows, id, true);

  return (
    <Styled.TableContentBlock>
      {contentHeading && (
        <Styled.Heading id={`table-${id}-header`}>
          {contentHeading}
        </Styled.Heading>
      )}
      <Table
        {...{ id, rows, header }}
        caption={caption || undefined}
        labelledById={contentHeading ? `table-${id}-header` : undefined}
      />
    </Styled.TableContentBlock>
  );
};

export default TableContentBlock;
