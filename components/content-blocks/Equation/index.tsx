import "temml/dist/Temml-Local.css";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import temml from "temml";

const Fragment = graphql(`
  fragment EquationBlock on contentBlocks_equation_BlockType {
    id
    latex
  }
`);

interface TextProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
}

const EquationContentBlock: FunctionComponent<TextProps> = (props) => {
  const { latex } = useFragment(Fragment, props.data);

  if (!latex) return null;

  const result = temml.renderToString(latex, { displayMode: true });

  return <div dangerouslySetInnerHTML={{ __html: result }}></div>;
};

EquationContentBlock.displayName = "ContentBlock.Equation";

export default EquationContentBlock;
