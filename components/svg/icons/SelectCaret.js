import { svgInternalShape } from "@/shapes/svg";
import defaultProps from "./defaultProps";

export default function SelectCaret({
  className,
  size = 18,
  fill = "currentColor",
}) {
  const uniqueProps = {
    viewBox: "0 0 18 9",
    width: size,
    height: size / 2,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Select caret icon</title>
      <path d="M0,0,9,9l9-9Z" />
    </svg>
  );
}

SelectCaret.displayName = "SVG.SelectCaret";

SelectCaret.propTypes = {
  ...svgInternalShape,
};
