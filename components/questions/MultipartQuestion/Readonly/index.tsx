import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { PartProps } from "..";

const Fragment = graphql(`
  fragment ReadOnlyPart on multiPartBlocks_readonlyText_BlockType {
    id
    type: typeHandle
    text: questionText
  }
`);

const Readonly: FunctionComponent<PartProps<FragmentType<typeof Fragment>>> = ({
  data,
}) => {
  const { text } = useFragment(Fragment, data);

  return <span>{text}</span>;
};

Readonly.displayName = "Questions.Multipart.Readonly";

export default Readonly;
