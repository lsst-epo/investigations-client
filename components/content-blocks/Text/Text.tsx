import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import { FunctionComponent } from "react";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment TextBlock on contentBlocks_text_BlockType {
    text
  }
`);

interface TextProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

const TextContentBlock: FunctionComponent<TextProps> = (props) => {
  const { text } = useFragment(Fragment, props.data);

  if (!text) return null;

  const isOpen = props.isOpen ?? false;

  return (
    <Styled.Container className="content-block">
      <Styled.TextContent
        dangerouslySetInnerHTML={{ __html: text }}
        $darkMode={isOpen}
      />
    </Styled.Container>
  );
};

TextContentBlock.displayName = "ContentBlock.Text";

export default TextContentBlock;
