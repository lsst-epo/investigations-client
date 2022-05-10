import { svgInternalShape } from "@/shapes/svg";
import defaultProps from "./defaultProps";

export default function Hamburger({
  className,
  size = 36,
  fill = "currentColor",
}) {
  const uniqueProps = {
    viewBox: "0 0 36 36",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Mobile menu (hamburger) icon</title>
      <rect x="0.99996" y="1.00024" width="34" height="3.13818" />
      <rect x="0.99996" y="16.43042" width="34" height="3.13867" />
      <rect x="0.99996" y="31.86108" width="34" height="3.13867" />
    </svg>
  );
}

Hamburger.displayName = "SVG.Hamburger";

Hamburger.propTypes = {
  ...svgInternalShape,
};

Hamburger.defaultProps = defaultProps;
