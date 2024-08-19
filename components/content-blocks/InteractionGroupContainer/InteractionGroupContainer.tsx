import { useTranslation } from "@/lib/i18n";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { blockMap } from "@/components/factories/ContentBlockFactory/ContentBlockFactory";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InteractionGroupContainerBlock on contentBlocks_group_BlockType {
    __typename
    childBlocks: children {
      __typename
      id
      ...TextBlock
      ...ImageBlock
      ...VideoBlock
      ...TableBlock
      ...QuestionsBlock
      ...BarGraphToolBlock
      ...FilterToolBlock
      ...ReferenceBlock
      ...ColorFilterToolBlock
      ...SupernovaDistanceDistributionBlock
      ...MagnitudeScatterPlotBlock
    }
  }
`);

export default async function InteractionGroupContainerBlock(props: {
  data: FragmentType<typeof Fragment>;
  site: string;
  locale: string;
  pageId?: string;
}) {
  const { t } = await useTranslation(props.locale, "translation");
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
