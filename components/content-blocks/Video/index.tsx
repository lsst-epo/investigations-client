import { FunctionComponent, use } from "react";
import { GenericPlayer as Video } from "@rubin-epo/epo-react-lib/Video";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { BaseContentBlockProps } from "@/components/shapes";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import { captionShaper, videoShaper } from "@/helpers";
import { useTranslation } from "@/lib/i18n/server";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment VideoBlock on contentBlocks_video_BlockType {
    id
    caption
    video {
      url {
        directUrlPreview
        directUrlPreviewPlay
      }
      width
      height
      metadata: additional {
        CaptionEN
        CaptionES
        Credit
      }
    }
  }
`);

const VideoBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = ({ data, site, locale }) => {
  const { t } = use(useTranslation(locale, "translation"));
  const { id, caption, video: videos } = useFragment(Fragment, data);

  if (!id || !videos || videos.length === 0) return null;

  const video = videoShaper(site, videos[0] as any);

  if (!video) return null;

  const { caption: fallback, credit, width, height } = video;

  return (
    <Styled.Container
      style={{
        "--video-aspect-ratio": width / height,
        "--video-width": `${width}px`,
      }}
    >
      <Figure
        withBackground
        caption={captionShaper({
          caption,
          fallback,
          credit:
            credit &&
            ` ${t("translation:image.credit", {
              credit,
              interpolation: { escapeValue: false },
            })}`,
        })}
      >
        <Video {...{ ...video, width, height }} />
      </Figure>
    </Styled.Container>
  );
};

VideoBlock.displayName = "ContentBlock.Video";

export default VideoBlock;
