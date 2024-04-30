import { FunctionComponent } from "react";
import isNull from "lodash/isNull";
import { BaseContentBlockProps } from "@/components/shapes";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import SupernovaDistanceDistribution from "@/components/dynamic/SupernovaDistanceDistribution";
import * as Styled from "./styles";
import tags from "@/lib/tags";

const Fragment = graphql(`
  fragment SupernovaDistanceDistributionBlock on contentBlocks_supernovaDistanceDistribution_BlockType {
    instructions: widgetInstructions
    imageAlbum {
      url {
        directUrlPreview
        directUrlOriginal
      }
      width
      height
      name
    }
    json {
      ... on datasets_Asset {
        url
      }
    }
    step: binSize
    ...LightCurveQuestionData
  }
`);

const SupernovaDistanceDistributionBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = async ({ data }) => {
  const { imageAlbum, json, step, instructions } = useFragment(Fragment, data);

  if (isNull(json) || isNull(json[0])) return null;

  const { url } = json[0];

  if (isNull(url)) return null;

  const response = await fetch(url, {
    cache: "force-cache",
    headers: { "Content-Type": "application/json" },
    next: { tags: [tags.datasets] },
  });
  const supernovaData: Array<number> = await response.json();

  return (
    <>
      {instructions && (
        <Styled.WidgetInstructions
          dangerouslySetInnerHTML={{ __html: instructions }}
        />
      )}
      <SupernovaDistanceDistribution
        album={imageAlbum}
        instructions={instructions || undefined}
        questionData={data}
        {...{ supernovaData, step }}
      />
    </>
  );
};

SupernovaDistanceDistributionBlock.displayName =
  "ContentBlock.SupernovaDistanceDistribution";

export default SupernovaDistanceDistributionBlock;
