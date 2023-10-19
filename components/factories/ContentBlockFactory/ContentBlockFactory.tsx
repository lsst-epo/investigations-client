import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Blocks from "@/components/content-blocks";

/** content blocks that can be rendered anywhere */
export const blockMap: Record<string, any> = {
  contentBlocks_twoColumnContainer_BlockType: Blocks.TwoColumnContainer,
  contentBlocks_group_BlockType: Blocks.InteractionGroupContainer,
  contentBlocks_text_BlockType: Blocks.Text,
  contentBlocks_image_BlockType: Blocks.Image,
  contentBlocks_questionBlock_BlockType: Blocks.Questions,
  contentBlocks_scatterplotTool_BlockType: Blocks.ScatterplotTool,
  contentBlocks_barGraphTool_BlockType: Blocks.BarGraphTool,
  contentBlocks_colorFilterToolBlock_BlockType: Blocks.ColorFilterTool,
  contentBlocks_filterTool_BlockType: Blocks.FilterTool,
  contentBlocks_cameraFilterTool_BlockType: Blocks.CameraFilterTool,
  contentBlocks_table_BlockType: Blocks.Table,
};

const Fragment = graphql(`
  fragment ContentBlockFactory on contentBlocks_NeoField {
    __typename
    ...TwoColumnContainerBlock
    ...InteractionGroupContainerBlock
    ...TextBlock
    ...ImageBlock
    ...TableBlock
    ...QuestionsBlock
    ...BarGraphToolBlock
    ...ColorFilterToolBlock
    ...FilterToolBlock
    ...ScatterplotToolBlock
  }
`);

interface ContentBlockFactoryProps {
  data: FragmentType<typeof Fragment>;
  site: string;
  pageId?: string;
}

export type ContentBlockType = keyof typeof blockMap;

const ContentBlockFactory: FunctionComponent<ContentBlockFactoryProps> = (
  props
) => {
  const data = useFragment(Fragment, props.data);

  const Block = blockMap[data.__typename];

  if (!Block) return null;
  return <Block data={data} site={props.site} pageId={props.pageId} />;
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
