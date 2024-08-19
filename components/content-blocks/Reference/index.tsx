"use client";
import { FunctionComponent, MouseEventHandler, useRef } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";

const Fragment = graphql(`
  fragment ReferenceBlock on contentBlocks_referenceModalBlock_BlockType {
    referenceModalEntries {
      ... on referenceModals_default_Entry {
        title
        uri
        slug
      }
    }
  }
`);

const ReferenceWindowContentBlock: FunctionComponent<
  BaseContentBlockProps<FragmentType<typeof Fragment>>
> = (props) => {
  const { referenceModalEntries } = useFragment(Fragment, props.data);
  const popupWindow = useRef<WindowProxy | null>(null);

  if (referenceModalEntries[0] === null) {
    return null;
  }

  const { uri, title, slug } = referenceModalEntries[0];

  const url = `/${uri}`;

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();

    if (popupWindow.current === null || popupWindow.current.closed) {
      const { innerWidth, innerHeight, outerHeight } = window;

      const width = innerWidth * (1 / 3);
      const height = innerHeight * (2 / 3);

      const settings = {
        popup: true,
        width,
        height,
        top: outerHeight - innerHeight,
        left: innerWidth - width,
      };

      const windowFeatures = Object.entries(settings)
        .map((entry) => entry.join("="))
        .join(",");

      popupWindow.current = window.open(url, slug, windowFeatures);
    } else {
      popupWindow.current.focus();
    }
  };

  return (
    <Buttonish
      onClick={handleClick}
      target={slug}
      rel="help"
      url={url}
      icon="Lightbulb"
      isBlock
      style={{ "--button-text-align": "left" }}
      text={title}
    />
  );
};

ReferenceWindowContentBlock.displayName = "ContentBlock.ReferenceWindow";

export default ReferenceWindowContentBlock;
