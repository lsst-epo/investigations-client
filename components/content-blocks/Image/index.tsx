"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useTranslation } from "react-i18next";
import withModal from "@/components/hoc/withModal/withModal";
import { BaseContentBlockProps } from "@/components/shapes";
import { captionShaper } from "@/helpers";
import { damAssetToImage } from "@/helpers/assets";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment ImageBlock on contentBlocks_image_BlockType {
    id
    caption
    layout
    image {
      url {
        directUrlPreview
        directUrlOriginal
        PNG
        HighJPG
        LowJPG
        preview
      }
      width
      height
      metadata: additional {
        AltTextEN
        AltTextES
        CaptionEN
        CaptionES
        Credit
      }
    }
  }
`);

interface ImageContentBlockProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
  site: string;
}

/**
 * Image content block with modal and two layout options.
 */
const ImageContentBlock: FunctionComponent<ImageContentBlockProps> = ({
  data,
  site,
  isOpen,
  openModal,
  hasModal,
}) => {
  const { t } = useTranslation();
  const { layout, image: rawImage, caption = "" } = useFragment(Fragment, data);
  const finalLayout = isOpen ? "vertical" : layout;

  const image = damAssetToImage(site, rawImage[0]);

  if (!image) return null;

  const {
    caption: fallback,
    credit,
    width,
    height,
    ...imageAttributes
  } = image;

  return (
    <Styled.Container
      data-modal-open={isOpen}
      className="content-block"
      style={{
        "--image-aspect-ratio": width / height,
        "--image-width": `${width}px`,
      }}
    >
      <Styled.Figure
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
        layout={finalLayout}
        withBackground={!isOpen}
      >
        <img
          {...{ ...imageAttributes, width, height }}
          decoding="async"
          loading="lazy"
        />
        {hasModal && !isOpen && (
          <Styled.ExpandContract onToggle={openModal} isOpen={isOpen} />
        )}
      </Styled.Figure>
    </Styled.Container>
  );
};

ImageContentBlock.displayName = "ContentBlock.Image";

export default withModal(ImageContentBlock);
