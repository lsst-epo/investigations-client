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
          ...ColorToolBlock
          ...FilterToolBlock
          ...TextBlock
          ...BarGraphToolBlock
          ...ScatterplotToolBlock
        }
      }
      ... on contentBlocks_colRight_BlockType {
        __typename
        id
        childblocks: children {
          __typename
          id
          ...ColorToolBlock
          ...FilterToolBlock
          ...TextBlock
          ...BarGraphToolBlock
          ...ScatterplotToolBlock
        }
      }
    }
  }
`);

export default function TwoColumnContainerBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  const data = useFragment(Fragment, props.data);
  const { columns } = data;

  function renderBlocks(blocks) {
    return blocks.map((block) => {
      if (!block) return;

      const Block = blockMap[block.__typename];

      if (!Block) return null;

      return <Block key={block.id} data={block} />;
    });
  }

  if (!columns) return null;

  const leftCol = columns.find(
    (col) => col.__typename === "contentBlocks_colLeft_BlockType"
  );
  const rightCol = columns.find(
    (col) => col.__typename === "contentBlocks_colRight_BlockType"
  );

  return (
    <Styled.TwoColContainer width="wide">
      {leftCol && renderBlocks(leftCol?.childblocks)}
      {rightCol && renderBlocks(rightCol?.childblocks)}
    </Styled.TwoColContainer>
  );
}

TwoColumnContainerBlock.displayName = "ContentBlock.TwoColumnContainer";
