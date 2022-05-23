export const investigationsPageFragment = `fragment investigationsPageFragment on investigations_investigationPage_Entry {
  id
  title
  contentBlocks {
    ...textBlock
    ...investigationsListBlock
  }
  language
  localized {
    uri
    language
  }
  children {
    uri
    title
  }
  next {
    uri
    title
  }
  prev {
    uri
    title
  }
  typeHandle
  uri
}`;
