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

export const allPageBlocksFragment = `
${textBlockFragment}
`;
