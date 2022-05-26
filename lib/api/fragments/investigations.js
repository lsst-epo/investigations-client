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
  next(section: "investigations") {
    uri
    level
    title
  }
  prev(section: "investigations") {
    uri
    level
    title
  }
  typeHandle
  uri
  level
}`;
