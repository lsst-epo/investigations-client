import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";

const Fragment = graphql(`
  fragment ScatterplotToolBlock on contentBlocks_scatterplotTool_BlockType {
    id
    title
    xAxisMin
    yAxisMax
    yAxisLabel
    xAxisLabel
    scatterplotItems {
      ... on scatterplotItems_item_BlockType {
        xValue
        yValue
        itemLabel
      }
    }
  }
`);

export default function ScatterplotToolBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  const data = useFragment(Fragment, props.data);

  return (
    <Container>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </Container>
  );
}

ScatterplotToolBlock.displayName = "ContentBlock.ScatterplotTool";
