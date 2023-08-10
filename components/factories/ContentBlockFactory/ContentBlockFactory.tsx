import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql";
import * as Blocks from "@/components/content-blocks";
import withModal from "@/hoc/withModal";

/** content blocks that can be rendered anywhere */
export const blockMap: Record<string, any> = {
  // contentBlocks_image_BlockType: Image,
  contentBlocks_text_BlockType: Blocks.Text,
  contentBlocks_widgetContainer_BlockType: Blocks.WidgetContainer,
  // contentBlocks_modal_BlockType: Modal,
};

interface ContentBlockFactoryProps {
  data: FragmentType<typeof Fragment>;
  pageId?: string;
  isInModal?: boolean;
}

export type ContentBlockType = keyof typeof blockMap;

const ContentBlockFactory: FunctionComponent<ContentBlockFactoryProps> = (
  props
) => {
  const data = useFragment(Fragment, props.data);

  const Block = blockMap[data.__typename];

  if (!Block) return null;

  const isWithModal = false;
  // const isWithModal =
  //   !props.isInModal && data.__typename !== "contentBlocks_modal_BlockType";

  const EnhancedBlock = isWithModal ? withModal(Block) : Block;

  return (
    <EnhancedBlock
      data={data}
      isOpen={props.isInModal}
      hasModal={!isWithModal}
      pageId={props.pageId}
    />
  );
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;

const Fragment = graphql(`
  fragment ContentBlockFactory on contentBlocks_NeoField {
    __typename
    ...TextContentBlock
    ...WidgetContainerBlock
  }
`);
