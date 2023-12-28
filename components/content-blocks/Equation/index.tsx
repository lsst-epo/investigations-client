import "temml/dist/Temml-Local.css";
import { LatinModernMath } from "@/lib/fonts";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { BaseContentBlockProps } from "@/components/shapes";
import * as Styled from "./styles";

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

  const uri = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/equation?latex=${encodeURIComponent(latex)}`;

  const result = await fetch(uri).then((response) => response.json());

  return (
    <Styled.MathWrapper
      className={LatinModernMath.variable}
      dangerouslySetInnerHTML={{ __html: result }}
    ></Styled.MathWrapper>
  );
};

EquationContentBlock.displayName = "ContentBlock.Equation";

export default EquationContentBlock;
