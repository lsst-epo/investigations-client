export const homepageFragment = `
fragment homepageFragment on homepage_homepage_Entry {
    id
    title
    language
    localized {
      uri
      language
    }
    typeHandle
    ...on homepage_homepage_Entry {
      pageType
      contentBlocks {
        ...textBlock
      }
    }
}
`;
