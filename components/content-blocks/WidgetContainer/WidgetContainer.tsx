import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql";

export default function WidgetContainerBlock(props: {
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

WidgetContainerBlock.displayName = "ContentBlock.WidgetContainer";

const Fragment = graphql(`
  fragment WidgetContainerBlock on contentBlocks_widgetContainer_BlockType {
    children {
      __typename
    }
  }
`);
