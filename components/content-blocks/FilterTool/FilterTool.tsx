import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";

const Fragment = graphql(`
  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {
    __typename
    preSelectedColor
    readOnly
  }
`);

export default function FilterToolBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useFragment(Fragment, props.data);

  return (
    <Container>
      <FilterTool />
    </Container>
  );
}

FilterToolBlock.displayName = "ContentBlock.FilterTool";
