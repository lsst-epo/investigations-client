"use client";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import Grid from "@rubin-epo/epo-react-lib/Grid";
import Tile from "./Tile";

const Fragment = graphql(`
  fragment CTAGridBlock on contentBlocks_ctaGrid_BlockType {
    id
    items: children {
      __typename
      id
      ... on contentBlocks_cta_BlockType {
        contentImage {
          url
          alt
          width
          height
        }
        mixedLink {
          type
          url
          text
          customText
          target
          element {
            uri
          }
        }
      }
    }
  }
`);

interface Props {
  data: FragmentType<typeof Fragment>;
}

export default function CTAGrid(props: Props) {
  const { items } = useFragment(Fragment, props.data);

  const tiles = (items ?? []).flatMap((item) =>
    item?.__typename === "contentBlocks_cta_BlockType" ? item : [],
  );

  if (!tiles.length) return null;

  return (
    <Grid columns={tiles.length === 4 ? 4 : 3} tablet={3} showFeature={false}>
      {tiles.map(({ id, contentImage, mixedLink }) => {
        const asset = contentImage[0];

        return (
          <Tile
            key={id}
            title={mixedLink?.customText || mixedLink?.text}
            image={
              asset?.url
                ? {
                    url: asset.url,
                    altText: asset.alt ?? undefined,
                    width: asset.width ?? undefined,
                    height: asset.height ?? undefined,
                  }
                : undefined
            }
            link={
              mixedLink?.url
                ? {
                    type: mixedLink.type ?? undefined,
                    url: mixedLink.url,
                    text: mixedLink.text ?? undefined,
                    customText: mixedLink.customText ?? undefined,
                    target: mixedLink.target ?? undefined,
                    element: mixedLink.element?.uri
                      ? { uri: mixedLink.element.uri }
                      : undefined,
                  }
                : undefined
            }
            type="cta"
          />
        );
      })}
    </Grid>
  );
}

CTAGrid.displayName = "ContentBlock.CTAGrid";
