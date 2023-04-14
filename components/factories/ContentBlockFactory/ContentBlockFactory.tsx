import { FunctionComponent } from "react";
import { Modal } from "@/content-blocks";
import { blockMap as safeBlockMap } from "@/factories/SafeContentBlockFactory/SafeContentBlockFactory";
import withModal from "@/hoc/withModal";

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
