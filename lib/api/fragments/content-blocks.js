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

export const questionsBlockFragment = `
  fragment questionsBlock on contentBlocks_NeoField {
    ... on contentBlocks_questions_BlockType {
      typeHandle
      id
    }
  }
`;

export const allPageBlocksFragment = `
${textBlockFragment}
${questionsBlockFragment}
`;
