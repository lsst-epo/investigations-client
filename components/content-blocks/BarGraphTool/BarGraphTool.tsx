import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";

export default function BarGraphToolBlock(props: {
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

BarGraphToolBlock.displayName = "ContentBlock.BarGraphTool";

const Fragment = graphql(`
  fragment BarGraphToolBlock on contentBlocks_barGraphTool_BlockType {
    title
    yAxisMin
    yAxisMax
    yAxisLabel
    xAxisLabel
    graphBars {
      ... on graphBars_bar_BlockType {
        __typename
        yValue
        label
      }
    }
  }
`);
