import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql";
import Text from "@/components/content-blocks/Text";
import withModal from "@/hoc/withModal";

/** content blocks that can be rendered anywhere */
export const blockMap = {
  // contentBlocks_image_BlockType: Image,
  contentBlocks_text_BlockType: Text,
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
  }
`);
