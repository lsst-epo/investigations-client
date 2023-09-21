import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { imageShaper } from "@/helpers";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment ImageBlock on contentBlocks_image_BlockType {
    caption
    layout
    image {
      url {
        directUrlPreview
      }
      width
      height
      additional {
        AltTextEN
        AltTextES
      }
    }
  }
`);

interface ImageContentBlockProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
  site: string;
  hasModal: boolean;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

/**
 * Image content block with modal and two layout options.
 */
const ImageContentBlock: FunctionComponent<ImageContentBlockProps> = (
  props
) => {
  const { data, site, isOpen, openModal } = props;
  const { caption, layout, image } = useFragment(Fragment, data);
  const finalLayout = isOpen ? "vertical" : layout;

  return (
    <Styled.Container className="content-block">
      {!isOpen && (
        <Styled.ExpandContract
          onToggle={openModal}
          isOpen={isOpen}
          $layout={finalLayout}
        />
      )}
      <Styled.Figure
        caption={caption}
        $layout={finalLayout}
        $darkMode={isOpen}
        withBackground={!isOpen}
      >
        <Styled.Image
          image={imageShaper(site, image[0])}
          $layout={finalLayout}
        />
      </Styled.Figure>
    </Styled.Container>
  );
};

ImageContentBlock.displayName = "ContentBlock.Image";

export default ImageContentBlock;
