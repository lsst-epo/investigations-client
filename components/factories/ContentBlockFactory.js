import PropTypes from "prop-types";
import {
  Image,
  Text,
  Callout,
  Link,
  ComplexTable,
  Contact,
  ContactStaff,
  Share,
  SimpleTable,
  AccordionGroup,
  GridBlock,
  Schedule,
  SlideBlock,
  TableGroup,
  Video,
  DownloadList,
} from "@/content-blocks";

const blockMap = {
  accordionGroup: AccordionGroup,
  callout: Callout,
  complexTable: ComplexTable,
  contact: Contact,
  contactStaff: ContactStaff,
  ctaGrid: GridBlock,
  image: Image,
  link: Link,
  linkedAsset: Link,
  news: GridBlock,
  relatedContent: GridBlock,
  schedule: Schedule,
  share: Share,
  simpleTable: SimpleTable,
  slideBlock: SlideBlock,
  staffGrid: GridBlock,
  tableGroup: TableGroup,
  text: Text,
  video: Video,
  downloadList: DownloadList,
};

export default function ContentBlockFactory({ type, data, pageId }) {
  const Block = blockMap[type];
  if (!Block) return null;
  return <Block {...data} pageId={pageId} />;
}

ContentBlockFactory.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
};
