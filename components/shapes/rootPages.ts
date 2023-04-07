export interface Entry {
  id: string;
  title: string;
  uri: string;
}

export default interface RootPage {
  header: string;
  allEntries: Entry[];
  pageEntry: any;
}
