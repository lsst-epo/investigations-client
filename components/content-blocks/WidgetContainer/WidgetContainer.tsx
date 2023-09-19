import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { blockMap } from "@/components/factories/ContentBlockFactory/ContentBlockFactory";

const Fragment = graphql(`
  fragment WidgetContainerBlock on contentBlocks_widgetContainer_BlockType {
    childBlocks: children {
      __typename
      id
      ...BarGraphToolBlock
      ...ScatterplotToolBlock
    }
  }
`);

export default function WidgetContainerBlock(props: {
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
            if (!block) return null;

            const Block = blockMap[block.__typename];

            if (!Block) return null;

            return <Block key={block.id} data={block} />;
          })}
        </>
      )}
    </Container>
  );
}

WidgetContainerBlock.displayName = "ContentBlock.WidgetContainer";
