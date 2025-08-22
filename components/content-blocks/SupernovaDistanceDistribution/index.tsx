import { FunctionComponent, use } from "react";
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

const getDataset = async (url?: string): Promise<Array<number>> => {
  if (url) {
    const response = await fetch(url, {
      cache: "force-cache",
      headers: { "Content-Type": "application/json" },
      next: { tags: [tags.datasets] },
    });
    return await response.json();
  } else {
    return [];
  }
};

const SupernovaDistanceDistributionBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data }) => {
  const { imageAlbum, json, step, instructions } = useFragment(Fragment, data);

  if (isNull(json) || isNull(json[0])) return null;

  const { url } = json[0];

  if (isNull(url)) return null;

  const supernovaData: Array<number> = use(getDataset(url));

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
