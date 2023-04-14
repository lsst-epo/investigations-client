import {
  BaseContentBlockProps,
  Image as ImageShape,
} from "@/components/shapes";
import { FunctionComponent } from "react";
import * as Styled from "./styles";

interface ImageContentBlockProps extends BaseContentBlockProps {
  image: ImageShape;
  caption?: string;
  layout?: "horizontal" | "vertical";
}

/**
 * Image content block with modal and two layout options.
 */
const ImageContentBlock: FunctionComponent<ImageContentBlockProps> = ({
  image,
  caption,
  layout = "vertical",
  hasModal = false,
  isOpen = false,
  openModal,
}) => {
  const finalLayout = isOpen ? "vertical" : layout;
  return (
    <Styled.FigureWrapper>
      {hasModal && !isOpen && (
        <Styled.ExpandContract
          onToggle={() => openModal && openModal()}
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
        <Styled.Image image={image} $layout={finalLayout} />
      </Styled.Figure>
    </Styled.FigureWrapper>
  );
};

ImageContentBlock.displayName = "ContentBlock.Image";

export default ImageContentBlock;
