import { Fragment } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Styled from "./styles";

const AssetFragment = graphql(`
  fragment AssessmentVideoCantoAsset on responsiveAssets_asset_BlockType {
    id
    orientation
    asset {
      width
      height
      url {
        directUrlOriginal
        directUrlPreview
        directUrlPreviewPlay
      }
      metadata {
        MIMEType
      }
    }
  }
`);

/**
 * Selections on CantoDamAssetInterface generate as `never` — the schema declares
 * no implementing types — so the shape the fragment selects is asserted here.
 * The Video and Image blocks work around the same gap with `as any`.
 */
interface CantoVideoAsset {
  width: string | null;
  height: string | null;
  url: {
    directUrlOriginal: string | null;
    directUrlPreview: string | null;
    directUrlPreviewPlay: string | null;
  } | null;
  metadata: { MIMEType: string | null } | null;
}

interface CantoPlayerProps {
  data: Array<FragmentType<typeof AssetFragment>>;
}

/** Widest viewport at which the smaller preview-play source is still used. */
const PREVIEW_MAX_WIDTH = { portrait: "720px", landscape: "1280px" };

type Orientation = keyof typeof PREVIEW_MAX_WIDTH;

interface CantoSource {
  id: string | null;
  orientation: Orientation;
  src: string;
  previewSrc?: string;
  poster?: string;
  mimeType?: string;
  width?: string;
  height?: string;
}

export default function CantoPlayer({ data }: CantoPlayerProps) {
  const blocks = useFragment(AssetFragment, data);

  const videos = blocks.flatMap<CantoSource>(({ id, orientation, asset }) => {
    const [video] = (asset ?? []) as Array<CantoVideoAsset | null>;
    const { directUrlOriginal, directUrlPreview, directUrlPreviewPlay } =
      video?.url ?? {};

    if (!directUrlOriginal) return [];

    return {
      id,
      orientation: orientation === "portrait" ? "portrait" : "landscape",
      src: directUrlOriginal,
      previewSrc: directUrlPreviewPlay ?? undefined,
      poster: directUrlPreview ?? undefined,
      mimeType: video?.metadata?.MIMEType ?? undefined,
      width: video?.width ?? undefined,
      height: video?.height ?? undefined,
    };
  });

  if (!videos.length) return null;

  const primary =
    videos.find(({ orientation }) => orientation === "landscape") ?? videos[0];

  return (
    <Styled.Video
      controls
      poster={primary.poster}
      width={primary.width}
      height={primary.height}
    >
      {videos.map(({ id, orientation, src, previewSrc, mimeType }) => (
        <Fragment key={id}>
          {previewSrc && (
            <source
              src={previewSrc}
              media={`(orientation: ${orientation}) and (max-width: ${PREVIEW_MAX_WIDTH[orientation]})`}
              type={mimeType}
            />
          )}
          <source
            src={src}
            media={`(orientation: ${orientation})`}
            type={mimeType}
          />
        </Fragment>
      ))}
    </Styled.Video>
  );
}

CantoPlayer.displayName = "ContentBlock.AssessmentVideo.Canto";
