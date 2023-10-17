import { useTranslation } from "react-i18next";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { blockMap } from "@/components/factories/ContentBlockFactory/ContentBlockFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InteractionGroupContainerBlock on contentBlocks_group_BlockType {
    __typename
    childBlocks: children {
      __typename
      ...TextBlock
      ...ImageBlock
      ...QuestionsBlock
      ...BarGraphToolBlock
      ...ColorToolBlock
      ...FilterToolBlock
      ...ScatterplotToolBlock
    }
  }
`);

export default function InteractionGroupContainerBlock(props: {
  data: FragmentType<typeof Fragment>;
  site: string;
  pageId?: string;
}) {
  const { t } = useTranslation();
  const { childBlocks } = useFragment(Fragment, props.data);

  function renderBlocks(blocks) {
    return blocks.map((block) => {
      if (!block) return;

      const Block = blockMap[block.__typename];

      if (!Block) return null;

      return (
        <Block
          key={block.id}
          data={block}
          site={props.site}
          pageId={props.pageId}
          isInteraction
        />
      );
    });
  }

  return (
    <Styled.InteractionGroup
      className="content-block"
      style={{ "--text-color": "#34706D" }}
    >
      <Styled.Heading>{t("page.interaction")}</Styled.Heading>
      {renderBlocks(childBlocks)}
    </Styled.InteractionGroup>
  );
}

InteractionGroupContainerBlock.displayName = "ContentBlock.TwoColumnContainer";
