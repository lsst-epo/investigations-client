import { FunctionComponent } from "react";
import {
  simpleBlockMap,
  SimpleContentBlockFactoryProps,
} from "@/components/factories/SimpleContentBlockFactory";
import { Modal } from "@/content-blocks";
import withModal from "@/hoc/withModal";

/** content blocks that can be rendered anywhere */
export const blockMap = {
  ...simpleBlockMap,
  modal: Modal,
};

export type ContentBlockType = keyof typeof blockMap;

interface ContentBlockFactoryProps
  extends Omit<SimpleContentBlockFactoryProps, "type"> {
  type: ContentBlockType;
}

const ContentBlockFactory: FunctionComponent<ContentBlockFactoryProps> = ({
  type,
  data,
  pageId,
  isInModal,
}) => {
  const Block = blockMap[type];
  if (!Block) return null;

  const isWithModal = !isInModal && type !== "modal";

  const EnhancedBlock = isWithModal ? withModal(Block as any) : Block;

  return (
    <EnhancedBlock
      {...{ ...data, isOpen: isInModal, hasModal: !isWithModal }}
      pageId={pageId}
    />
  );
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
