/// ///////////////////////////////////////////
///   Page Content Blocks
/// ///////////////////////////////////////////

export const textBlockFragment = `
  fragment textBlock on contentBlocks_NeoField {
    ... on contentBlocks_text_BlockType {
      typeHandle
      id
      text
    }
  }
`;

export const investigationsListBlockFragment = `
  fragment investigationsListBlock on contentBlocks_NeoField {
    ... on contentBlocks_investigationsList_BlockType {
      id
      typeHandle
      investigations: children {
        ... on contentBlocks_investigationItem_BlockType {
          investigation {
            url
            title
          }
        }
      }
    }
  }
`;

export const allPageBlocksFragment = `
${investigationsListBlockFragment}
${textBlockFragment}
`;
