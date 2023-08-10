import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql";
import { blockMap } from "@/components/factories/ContentBlockFactory/ContentBlockFactory";

export default function TwoColumnContainerBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  const data = useFragment(Fragment, props.data);

  return (
    <Container>
      <pre>
        <code>{`{ "__typename": "${data.__typename}" }`}</code>
      </pre>
      {!!data.childBlocks?.length && (
        <>
          {data.childBlocks.map((block) => {
            if (!block) return;

            const Block = blockMap[block.__typename];

            if (!Block) return null;

            return <Block key={block.id} data={block} />;
          })}
        </>
      )}
    </Container>
  );
}

TwoColumnContainerBlock.displayName = "ContentBlock.TwoColumnContainer";

const Fragment = graphql(`
  fragment TwoColumnContainerBlock on contentBlocks_twoColumnContainer_BlockType {
    childBlocks: children {
      __typename
      id
      ...TextBlock
      ...BarGraphToolBlock
      ...ScatterplotToolBlock
    }
  }
`);
