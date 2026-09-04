"use client";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import Container from "@rubin-epo/epo-react-lib/Container";
import MixedLink from "@rubin-epo/epo-react-lib/MixedLink";

const Fragment = graphql(`
  fragment LinkBlock on contentBlocks_link_BlockType {
    id
    mixedLink {
      type
      url
      text
      customText
      ariaLabel
      target
      element {
        uri
      }
    }
  }
`);

interface Props {
  data: FragmentType<typeof Fragment>;
}

export default function LinkContentBlock(props: Props) {
  const { mixedLink } = useFragment(Fragment, props.data);

  if (!mixedLink?.url) return null;

  const { type, url, text, customText, ariaLabel, target, element } = mixedLink;

  return (
    <Container>
      <MixedLink
        type={type ?? undefined}
        url={url}
        text={customText || text || undefined}
        aria-label={ariaLabel ?? undefined}
        target={target ?? undefined}
        element={element?.uri ? { uri: element.uri } : undefined}
        className="c-buttonish c-buttonish--block"
      />
    </Container>
  );
}

LinkContentBlock.displayName = "ContentBlock.Link";
