import { FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import SupernovaThreeVectorContainer from "@/components/dynamic/SupernovaThreeVector";

const Fragment = graphql(`
  fragment SupernovaThreeVectorBlock on contentBlocks_supernovaThreeVector_BlockType {
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
    step
    userData: dataset {
      ... on datasets_supernovaGalaxyObservations_Entry {
        id: title
        distance
        lat: l
        long: b
      }
    }
  }
`);

const SupernovaThreeVectorBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = async ({ data }) => {
  const { imageAlbum, json, step, userData } = useFragment(Fragment, data);

  if (!json || !json[0]) return null;

  const { url } = json[0];
  const response = await fetch(url || "", {
    headers: { "Content-Type": "application/json" },
  });
  const supernovaData: Array<number> = await response.json();

  return (
    <SupernovaThreeVectorContainer
      album={imageAlbum}
      {...{ supernovaData, step, userData }}
    />
  );
};

SupernovaThreeVectorBlock.displayName = "ContentBlock.SupernovaThreeVector";

export default SupernovaThreeVectorBlock;
