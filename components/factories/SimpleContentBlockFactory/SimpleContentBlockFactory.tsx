import { FunctionComponent } from "react";
import { Image } from "@/content-blocks";
import Text from "@/components/content-blocks/Text";

/** content blocks that can be rendered within other content blocks */
export const simpleBlockMap = {
  text: Text,
  image: Image,
};

export type SimpleContentBlockType = keyof typeof simpleBlockMap;

export interface SimpleContentBlockFactoryProps {
  type: SimpleContentBlockType;
  pageId: string;
  data: any;
  isInModal?: boolean;
}

const SimpleContentBlockFactory: FunctionComponent<
  SimpleContentBlockFactoryProps
> = ({ type, data, pageId, isInModal = false }) => {
  const Block = simpleBlockMap[type];
  if (!Block) return null;

  return (
    <Block
      {...{ ...data, isOpen: isInModal, hasModal: false }}
      pageId={pageId}
    />
  );
};

SimpleContentBlockFactory.displayName = "ContentBlocks.FactorySimple";

export default SimpleContentBlockFactory;
