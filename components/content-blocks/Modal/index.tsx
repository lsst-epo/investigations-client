import { FunctionComponent } from "react";
import { BaseContentBlockProps } from "@/components/shapes";
import Button from "@rubin-epo/epo-react-lib/Button";
import Link from "next/link";
import { FragmentType, graphql, useFragment } from "@/gql/public-schema";

const Fragment = graphql(`
  fragment ReferenceModalBlock on contentBlocks_referenceModalBlock_BlockType {
    referenceModalEntries {
      ... on referenceModals_default_Entry {
        title
        uri
      }
    }
  }
`);

interface ModalContentBlockProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

const ModalContentBlock: FunctionComponent<ModalContentBlockProps> = (
  props
) => {
  const { referenceModalEntries } = useFragment(Fragment, props.data);
  const { uri, title } = referenceModalEntries[0];

  return (
    <Button
      as={Link}
      href={uri}
      icon="Lightbulb"
      isBlock
      style={{ "--button-text-align": "left" }}
    >
      {title}
    </Button>
  );
};

ModalContentBlock.displayName = "ContentBlock.Modal";

export default ModalContentBlock;
