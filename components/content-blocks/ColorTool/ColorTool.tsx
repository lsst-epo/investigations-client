import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";

export default function ColorToolBlock(props: {
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

ColorToolBlock.displayName = "ContentBlock.ColorTool";

const Fragment = graphql(`
  fragment ColorToolBlock on contentBlocks_colorTool_BlockType {
    __typename
    colorToolTemplate
    readOnly
    images {
      ... on images_imageGroup_BlockType {
        __typename
        uri
      }
    }
  }
`);