import { FunctionComponent } from "react";
import { Image } from "@/content-blocks";
import Text from "@/components/content-blocks/Text";
import withModal from "@/hoc/withModal";

export const blockMap = {
  text: Text,
  // text: () => <>h1</>,
  image: Image,
};

export type SafeContentBlockType = keyof typeof blockMap;

interface SafeContentBlockFactoryProps {
  type: SafeContentBlockType;
  pageId: string;
  data: any;
  isInModal?: boolean;
}

const SafeContentBlockFactory: FunctionComponent<
  SafeContentBlockFactoryProps
> = ({ type, data, pageId, isInModal }) => {
  const Block = blockMap[type];
  if (!Block) return null;

  const FinalBlock = isInModal ? Block : withModal(Block as any);

  return <FinalBlock {...data} pageId={pageId} />;
};

SafeContentBlockFactory.displayName = "ContentBlocks.SafeFactory";

export default SafeContentBlockFactory;
