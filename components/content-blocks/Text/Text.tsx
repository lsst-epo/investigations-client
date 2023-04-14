import { Container } from "@rubin-epo/epo-react-lib";
import { BaseContentBlockProps } from "@/components/shapes";
import { FunctionComponent } from "react";
import * as Styled from "./styles";

interface TextProps extends BaseContentBlockProps {
  text: string;
}

const TextContentBlock: FunctionComponent<TextProps> = ({
  text,
  isOpen = false,
}) => {
  return (
    <Container
      bgColor={isOpen ? "transparent" : undefined}
      paddingSize={isOpen ? "none" : "medium"}
    >
      <Styled.TextContent
        dangerouslySetInnerHTML={{ __html: text }}
        $darkMode={isOpen}
      />
    </Container>
  );
};

TextContentBlock.displayName = "ContentBlock.Text";

export default TextContentBlock;
