import { FunctionComponent } from "react";
import { Modal, Image } from "@/content-blocks";
import Text from "@/components/content-blocks/Text";
import withModal from "@/hoc/withModal";

/** content blocks that can be rendered within other content blocks */
export const safeBlockMap = {
  text: Text,
  image: Image,
};

export type SafeContentBlockType = keyof typeof safeBlockMap;

/** content blocks that can be rendered anywhere */
const blockMap = {
  ...safeBlockMap,
  modal: Modal,
};

export type ContentBlockType = keyof typeof blockMap;

interface ContentBlockFactoryProps {
  type: ContentBlockType;
  pageId: string;
  data: any;
  isInModal?: boolean;
}

const ContentBlockFactory: FunctionComponent<ContentBlockFactoryProps> = ({
  type,
  data,
  pageId,
  isInModal,
}) => {
  const Block = blockMap[type];
  if (!Block) return null;

  const FinalBlock =
    isInModal || type === "modal" ? Block : withModal(Block as any);

  return <FinalBlock {...data} pageId={pageId} />;
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
