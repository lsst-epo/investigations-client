import { useState } from "react";
import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import FilterTool from "@rubin-epo/epo-widget-lib/FilterTool";

const Fragment = graphql(`
  fragment FilterToolBlock on contentBlocks_filterTool_BlockType {
    __typename
    id
    preSelectedColor
    readOnly
  }
`);

export default function FilterToolBlock(props: {
  data: FragmentType<typeof Fragment>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { preSelectedColor, readOnly } = useFragment(Fragment, props.data);
  const [selectedColor, setSelectedColor] = useState(preSelectedColor);

  return (
    <Container>
      <FilterTool
        isDisabled={readOnly}
        selectedColor={selectedColor}
        selectionCallback={(selection) => setSelectedColor(selection)}
      />
    </Container>
  );
}

FilterToolBlock.displayName = "ContentBlock.FilterTool";
