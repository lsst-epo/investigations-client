import { FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import SupernovaDistanceDistribution from "@/components/dynamic/SupernovaDistanceDistribution";
import * as Styled from "./styles";

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
    userData: dataset {
      ... on datasets_supernovaGalaxyObservations_Entry {
        id: title
        distance
        lat: galacticLatitude
        long: galacticLongitude
      }
    }
  }
`);

const SupernovaDistanceDistributionBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = async ({ data }) => {
  const { imageAlbum, json, step, userData, instructions } = useFragment(
    Fragment,
    data
  );

  if (!json || !json[0]) return null;

  const { url } = json[0];

  if (!url) return null;

  const response = await fetch(url, {
    cache: "force-cache",
    headers: { "Content-Type": "application/json" },
    next: { tags: ["datasets"] },
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
        {...{ supernovaData, step, userData }}
      />
    </>
  );
};

SupernovaDistanceDistributionBlock.displayName =
  "ContentBlock.SupernovaDistanceDistribution";

export default SupernovaDistanceDistributionBlock;
