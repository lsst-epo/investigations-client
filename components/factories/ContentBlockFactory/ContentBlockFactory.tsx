import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Blocks from "@/components/content-blocks";
import { BaseContentBlockProps } from "@/components/shapes";

/** content blocks that can be rendered anywhere */
export const blockMap: Record<
  string,
  FunctionComponent<BaseContentBlockProps>
> = {
  contentBlocks_twoColumnContainer_BlockType: Blocks.TwoColumnContainer,
  contentBlocks_group_BlockType: Blocks.InteractionGroupContainer,
  contentBlocks_supernovaDistanceDistribution_BlockType:
    Blocks.SupernovaDistanceDistribution,
  contentBlocks_text_BlockType: Blocks.Text,
  contentBlocks_image_BlockType: Blocks.Image,
  contentBlocks_questionBlock_BlockType: Blocks.Questions,
  contentBlocks_barGraphTool_BlockType: Blocks.BarGraphTool,
  contentBlocks_magnitudeScatterPlot_BlockType: Blocks.MagnitudeScatterPlot,
  contentBlocks_filterTool_BlockType: Blocks.FilterTool,
  contentBlocks_cameraFilterTool_BlockType: Blocks.CameraFilterTool,
  contentBlocks_table_BlockType: Blocks.Table,
  contentBlocks_referenceBlock_BlockType: Blocks.Reference,
  contentBlocks_colorFilterToolBlock_BlockType: Blocks.ColorFilterTool,
  contentBlocks_equation_BlockType: Blocks.Equation,
  contentBlocks_video_BlockType: Blocks.Video,
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
    ...VideoBlock
    ...TableBlock
    ...QuestionsBlock
    ...BarGraphToolBlock
    ...FilterToolBlock
    ...ReferenceBlock
    ...ColorFilterToolBlock
    ...CameraFilterToolBlock
    ...EquationBlock
    ...SupernovaDistanceDistributionBlock
    ...MagnitudeScatterPlotBlock
  }
`);

interface ContentBlockFactoryProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

export type ContentBlockType = keyof typeof blockMap;

const ContentBlockFactory: FunctionComponent<ContentBlockFactoryProps> = ({
  ...props
}) => {
  const { __typename } = useFragment(Fragment, props.data);

  const Block = blockMap[__typename];

  if (!Block) return null;

  return <Block {...props} />;
};

ContentBlockFactory.displayName = "ContentBlocks.Factory";

export default ContentBlockFactory;
