import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import Equation from "@/components/atomic/Equation";

const Fragment = graphql(`
  fragment EquationBlock on contentBlocks_equation_BlockType {
    id
    latex
  }
`);

interface TextProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

const EquationContentBlock: FunctionComponent<TextProps> = async (props) => {
  const { latex } = useFragment(Fragment, props.data);

  if (!latex) return null;

  return <Equation {...{ latex }} />;
};

EquationContentBlock.displayName = "ContentBlock.Equation";

export default EquationContentBlock;
