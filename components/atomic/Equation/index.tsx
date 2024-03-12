import "@/lib/temml/Temml-Latin-Modern.css";
import { FunctionComponent } from "react";
import temml from "temml";

const Equation: FunctionComponent<{ latex: string }> = ({ latex }) => {
  const mathMl = temml.renderToString(latex, {
    displayMode: true,
    throwOnError: true,
  });

  return (
    <div
      style={{ color: "var(--neutral95, #1F2121)" }}
      dangerouslySetInnerHTML={{ __html: mathMl }}
    />
  );
};

Equation.displayName = "Atomic.Equation";

export default Equation;
