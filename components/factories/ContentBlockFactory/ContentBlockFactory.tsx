import { FunctionComponent } from "react";
import { Modal, Image } from "@/content-blocks";
import Text from "@/components/content-blocks/Text";
import withModal from "@/hoc/withModal";

/** content blocks that can be rendered within other content blocks */
export const safeBlockMap = {
  text: Text,
  image: Image,
};
/** content blocks that can be rendered anywhere */
export const blockMap = {
  ...safeBlockMap,
  modal: Modal,
};

export type SafeContentBlockType = keyof typeof safeBlockMap;
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
  const Block =
    isInModal && type !== "modal" ? safeBlockMap[type] : blockMap[type];
  if (!Block) return null;

  const isWithModal = !isInModal && type !== "modal";

  const FinalBlock = isWithModal ? withModal(Block as any) : Block;

  return (
    <FinalBlock
      {...{ ...data, isOpen: isInModal, hasModal: !isWithModal }}
      pageId={pageId}
    />
  );
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
