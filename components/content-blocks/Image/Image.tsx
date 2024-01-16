"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { useTranslation } from "react-i18next";
import withModal from "@/components/hoc/withModal/withModal";
import { BaseContentBlockProps } from "@/components/shapes";
import { captionShaper, imageShaper } from "@/helpers";
import { fluidScale } from "@rubin-epo/epo-react-lib/styles";
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
const ImageContentBlock: FunctionComponent<ImageContentBlockProps> = (
  props
) => {
  const { t } = useTranslation();
  const { data, site, isOpen, openModal } = props;
  const { layout, image: rawImage, caption = "" } = useFragment(Fragment, data);
  const finalLayout = isOpen ? "vertical" : layout;

  const image = imageShaper(site, rawImage[0]);

  if (!image) return null;

  const { width, caption: fallback, credit } = image;

  return (
    <Styled.Container
      className="content-block"
      style={{
        "--max-image-width": isOpen ? `${width}px` : "auto",
        "--image-content-block-padding": isOpen
          ? 0
          : fluidScale("20px", "10px"),
      }}
    >
      {!isOpen && (
        <Styled.ExpandContract
          onToggle={openModal}
          isOpen={isOpen}
          $layout={finalLayout}
        />
      )}
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
        $layout={finalLayout}
        $darkMode={isOpen}
        withBackground={!isOpen}
      >
        <Styled.Image image={image} $layout={finalLayout} />
      </Styled.Figure>
    </Styled.Container>
  );
};

ImageContentBlock.displayName = "ContentBlock.Image";

export default withModal(ImageContentBlock);
