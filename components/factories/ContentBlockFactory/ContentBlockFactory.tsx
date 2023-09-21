import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Blocks from "@/components/content-blocks";
import withModal from "@/hoc/withModal";

/** content blocks that can be rendered anywhere */
export const blockMap: Record<string, any> = {
  contentBlocks_twoColumnContainer_BlockType: Blocks.TwoColumnContainer,
  contentBlocks_text_BlockType: Blocks.Text,
  contentBlocks_image_BlockType: Blocks.Image,
  contentBlocks_questionBlock_BlockType: Blocks.Questions,
  contentBlocks_widgetContainer_BlockType: Blocks.WidgetContainer,
  contentBlocks_scatterplotTool_BlockType: Blocks.ScatterplotTool,
  contentBlocks_barGraphTool_BlockType: Blocks.BarGraphTool,
  contentBlocks_colorTool_BlockType: Blocks.ColorTool,
  contentBlocks_filterTool_BlockType: Blocks.FilterTool,
  // contentBlocks_modal_BlockType: Modal,
};

const Fragment = graphql(`
  fragment ContentBlockFactory on contentBlocks_NeoField {
    __typename
    ...TwoColumnContainerBlock
    ...TextBlock
    ...ImageBlock
    ...QuestionsBlock
    ...WidgetContainerBlock
    ...BarGraphToolBlock
    ...ColorToolBlock
    ...FilterToolBlock
    ...ScatterplotToolBlock
  }
`);

interface ContentBlockFactoryProps {
  data: FragmentType<typeof Fragment>;
  site: string;
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

  const isWithModal =
    props.isInModal || data.__typename === "contentBlocks_image_BlockType";

  const EnhancedBlock = isWithModal ? withModal(Block) : Block;

  return (
    <EnhancedBlock
      data={data}
      site={props.site}
      pageId={props.pageId}
    />
  );
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
