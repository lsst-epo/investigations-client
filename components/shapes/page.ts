export default interface PageData {
  id: string;
  uri?: string;
  title: string;
  contentBlocks?: any[];
  pageType: string;
  typeHandle: "pages";
}
