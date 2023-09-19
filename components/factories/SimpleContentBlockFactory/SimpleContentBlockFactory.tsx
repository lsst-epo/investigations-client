import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import Text from "@/components/content-blocks/Text";

export const simpleBlockMap: Record<string, any> = {
  // contentBlocks_imageBlock_BlockType: Image,
  contentBlocks_textBlock_BlockType: Text,
};

const Fragment = graphql(`
  fragment SimpleContentBlockFactory on contentBlocks_NeoField {
    __typename
    ...TextBlock
  }
`);

interface SimpleContentBlockFactoryProps {
  data: FragmentType<typeof Fragment>;
  pageId: string;
  isInModal?: boolean;
}

const SimpleContentBlockFactory: FunctionComponent<
  SimpleContentBlockFactoryProps
> = (props) => {
  const data = useFragment(Fragment, props.data);

  const Block = simpleBlockMap[data.__typename];

  if (!Block) return null;

  return (
    <Block
      data={data}
      isOpen={props.isInModal}
      hasModal={false}
      pageId={props.pageId}
    />
  );
};

SimpleContentBlockFactory.displayName = "ContentBlocks.FactorySimple";

export default SimpleContentBlockFactory;
