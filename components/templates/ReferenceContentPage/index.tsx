"use client";
import { FunctionComponent } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment ReferenceContentTemplate on referenceModals_default_Entry {
    __typename
    title
    id
    contentBlocks: referenceContentBlocks {
      __typename
      ... on referenceContentBlocks_text_BlockType {
        id
        text
      }
      ... on referenceContentBlocks_image_BlockType {
        id
        caption
        layout
        image {
          url {
            directUrlPreview
            directUrlOriginal
            PNG
            HighJPG
            LowJPG
            preview
          }
          width
          height
          metadata: additional {
            AltTextEN
            AltTextES
            CaptionEN
            CaptionES
            Credit
          }
        }
      }
      ... on referenceContentBlocks_table_BlockType {
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
    }
  }
`);

const ReferenceContentPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  isInModal?: boolean;
}> = ({ site, isInModal = false, ...props }) => {
  const data = useFragment(Fragment, props.data);
  const { title, id } = data;

  return (
    <Styled.ContentBlocks paddingSize="none" width="wide" bgColor="transparent">
      <Styled.Title>{title}</Styled.Title>
      {data.contentBlocks?.map(
        (block, i) =>
          block && (
            <ContentBlockFactory
              key={i}
              site={site}
              data={block}
              pageId={id}
              isOpen={isInModal}
              hasModal={!isInModal}
            />
          )
      )}
    </Styled.ContentBlocks>
  );
};

export default ReferenceContentPage;
