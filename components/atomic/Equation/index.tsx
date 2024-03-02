import "temml/dist/Temml-Local.css";
import { FunctionComponent } from "react";
import temml from "temml";
import { LatinModernMath } from "@/lib/fonts";
import * as Styled from "./styles";

const Equation: FunctionComponent<{ latex: string }> = ({ latex }) => {
  const mathMl = temml.renderToString(latex, {
    displayMode: true,
    throwOnError: true,
  });

  return (
    <Styled.MathWrapper
      className={LatinModernMath.variable}
      dangerouslySetInnerHTML={{ __html: mathMl }}
    />
  );
};

Equation.displayName = "Atomic.Equation";

export default Equation;
