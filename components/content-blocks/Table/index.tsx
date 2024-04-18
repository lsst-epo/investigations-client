import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import Table from "@/components/layout/Table";
import { BaseContentBlockProps } from "@/components/shapes";
import { isNullish, notNull } from "@/lib/utils";
import { buildHeader, buildRows } from "@/components/layout/Table/helpers";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment TableBlock on contentBlocks_table_BlockType {
    id
    caption
    contentHeading
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
    rows: displayTable {
      ... on displayTable_BlockType {
        cells: tableRow {
          ... on tableRow_tableCell_BlockType {
            id
            text: cellContent
            equation
          }
          ... on tableRow_rowHeader_BlockType {
            id
            text
            equation
          }
          ... on tableRow_previousQuestion_BlockType {
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

const TableContentBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data }) => {
  const { id, caption, contentHeading, rows, header } = useFragment(
    Fragment,
    data
  );

  if (isNullish(id)) return null;

  const headerCells = header[0]?.headerRow.filter(notNull);

  return (
    <Styled.TableContentBlock>
      {contentHeading && (
        <Styled.Heading id={`table-${id}-header`}>
          {contentHeading}
        </Styled.Heading>
      )}
      <Table
        {...{ id, rows }}
        rows={buildRows(rows, id, { readOnly: true })}
        header={buildHeader(headerCells)}
        caption={caption || undefined}
        labelledById={contentHeading ? `table-${id}-header` : undefined}
      />
    </Styled.TableContentBlock>
  );
};

export default TableContentBlock;
