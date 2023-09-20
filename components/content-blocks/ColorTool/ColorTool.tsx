import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ColorTool from "@rubin-epo/epo-widget-lib/ColorTool";
import { mockData, mockSelectedData } from "./mocks.ts";

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

export default function ColorToolBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useFragment(Fragment, props.data);

  return (
    <Container>
      <ColorTool
        data={mockData}
        selectedData={mockSelectedData}
      />
    </Container>
  );
}

ColorToolBlock.displayName = "ContentBlock.ColorTool";