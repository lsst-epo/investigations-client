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
  contentBlocks_filterTool_BlockType: Blocks.FilterTool,
  contentBlocks_cameraFilterTool_BlockType: Blocks.CameraFilterTool,
  contentBlocks_table_BlockType: Blocks.Table,
  contentBlocks_referenceModalBlock_BlockType: Blocks.Modal,
  contentBlocks_colorFilterToolBlock_BlockType: Blocks.ColorFilterTool,
  contentBlocks_equation_BlockType: Blocks.Equation,
  referenceContentBlocks_image_BlockType: Blocks.Image,
  referenceContentBlocks_text_BlockType: Blocks.Text,
  referenceContentBlocks_table_BlockType: Blocks.Table,
  homepageContentBlocks_text_BlockType: Blocks.Text,
  homepageContentBlocks_image_BlockType: Blocks.Image,
  homepageContentBlocks_investigationGrid_BlockType: Blocks.InvestigationGrid,
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
    ...FilterToolBlock
    ...ScatterplotToolBlock
    ...ReferenceModalBlock
    ...ColorFilterToolBlock
    ...EquationBlock
  }
`);

interface ContentBlockFactoryProps {
  data: FragmentType<typeof Fragment>;
  site: string;
  pageId?: string;
  isOpen?: boolean;
  hasModal?: boolean;
}

export type ContentBlockType = keyof typeof blockMap;

const ContentBlockFactory: FunctionComponent<ContentBlockFactoryProps> = ({
  site,
  pageId,
  isOpen,
  hasModal,
  ...props
}) => {
  const data = useFragment(Fragment, props.data);

  const Block = blockMap[data.__typename];

  if (!Block) return null;
  return (
    <Block
      data={data}
      site={site}
      pageId={pageId}
      isOpen={isOpen}
      hasModal={hasModal}
    />
  );
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
