import Container from "@rubin-epo/epo-react-lib/Container";
import type { ContainerProps } from "@rubin-epo/epo-react-lib/Container";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import YouTubePlayer from "./YouTube";
import CantoPlayer from "./Canto";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment AssessmentVideoBlock on contentBlocks_assessmentVideo_BlockType {
    id
    caption
    backgroundColor
    fullWidth
    videoType
    externalUrlTranslatable
    responsiveAssets {
      ... on responsiveAssets_asset_BlockType {
        __typename
        id
        ...AssessmentVideoCantoAsset
      }
    }
  }
`);

interface AssessmentVideoProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

export default function AssessmentVideo(props: AssessmentVideoProps) {
  const {
    caption,
    backgroundColor,
    fullWidth,
    videoType,
    externalUrlTranslatable: url,
    responsiveAssets,
  } = useFragment(Fragment, props.data);

  const isCanto = videoType === true;

  const cantoAssets = responsiveAssets.flatMap((asset) =>
    asset?.__typename === "responsiveAssets_asset_BlockType" ? asset : [],
  );

  const player = isCanto ? (
    cantoAssets.length ? (
      <CantoPlayer data={cantoAssets} />
    ) : null
  ) : url ? (
    <YouTubePlayer url={url} />
  ) : null;

  if (!player) return null;

  const figure = (
    <Figure caption={caption ?? undefined} withBackground={!fullWidth}>
      {player}
    </Figure>
  );

  return fullWidth ? (
    <Styled.Container
      style={{
        backgroundColor: backgroundColor && `var(--${backgroundColor})`,
      }}
    >
      {figure}
    </Styled.Container>
  ) : (
    <Container
      bgColor={(backgroundColor as ContainerProps["bgColor"]) || undefined}
      paddingSize="medium"
    >
      {figure}
    </Container>
  );
}

AssessmentVideo.displayName = "ContentBlock.AssessmentVideo";
