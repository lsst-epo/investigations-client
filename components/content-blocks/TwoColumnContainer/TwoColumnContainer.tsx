import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { blockMap } from "@/components/factories/ContentBlockFactory/ContentBlockFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {
    columns: children {
      ... on contentBlocks_colLeft_BlockType {
        __typename
        id
        childblocks: children {
          __typename
          id
          ...TextBlock
          ...ImageBlock
          ...TableBlock
          ...VideoBlock
          ...QuestionsBlock
          ...BarGraphToolBlock
          ...FilterToolBlock
          ...ReferenceBlock
          ...ColorFilterToolBlock
          ...SupernovaDistanceDistributionBlock
          ...MagnitudeScatterPlotBlock
        }
      }
      ... on contentBlocks_colRight_BlockType {
        __typename
        id
        childblocks: children {
          __typename
          id
          ...TextBlock
          ...ImageBlock
          ...TableBlock
          ...VideoBlock
          ...QuestionsBlock
          ...BarGraphToolBlock
          ...FilterToolBlock
          ...ReferenceBlock
          ...ColorFilterToolBlock
          ...SupernovaDistanceDistributionBlock
          ...MagnitudeScatterPlotBlock
        }
      }
    }
  }
`);

export default function TwoColumnContainerBlock(props: {
  data: FragmentType<typeof Fragment>;
  site: string;
  pageId?: string;
}) {
  const data = useFragment(Fragment, props.data);
  const { columns } = data;

  if (!columns) return null;

  const leftCol = columns.find(
    (col) => col.__typename === "contentBlocks_colLeft_BlockType"
  );
  const rightCol = columns.find(
    (col) => col.__typename === "contentBlocks_colRight_BlockType"
  );

  function renderBlocks(blocks) {
    return blocks.map((block) => {
      if (!block) return;

      const Block = blockMap[block.__typename];

      if (!Block) return null;

      return (
        <Block
          key={block.id}
          data={block}
          site={props.site}
          pageId={props.pageId}
        />
      );
    });
  }

  return (
    <Styled.TwoColContainer className="content-block">
      {leftCol && (
        <Styled.LeftCol>{renderBlocks(leftCol?.childblocks)}</Styled.LeftCol>
      )}
      {rightCol && (
        <Styled.RightCol>{renderBlocks(rightCol?.childblocks)}</Styled.RightCol>
      )}
    </Styled.TwoColContainer>
  );
}

TwoColumnContainerBlock.displayName = "ContentBlock.TwoColumnContainer";
