export const pageFragment = `
  fragment pageFragment on pages_pages_Entry {
    id
    title
    language
    localized {
      uri
      language
    }
    typeHandle
    uri
    ...on pages_pages_Entry {
      date: dateUpdated
      pageType
      contentBlocks {
        ...textBlock
      }
    }
  }
`;
