import { svgInternalShape } from "@/shapes/svg";
import defaultProps from "./defaultProps";

export default function Pin({ className, size = 24, fill = "currentColor" }) {
  const uniqueProps = {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill,
    className,
  };

  const mergedSvgProps = Object.assign(defaultProps, uniqueProps);
  return (
    <svg {...mergedSvgProps}>
      <title>Pin icon</title>
      <path d="m12 12.7c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.4 4.3-4.4 4.3 1.9 4.3 4.3c0 2.5-1.9 4.4-4.3 4.4m0-12.4c-4.4 0-8 3.6-8 8v0.2c0.1 8.8 8 15.3 8 15.3s7.9-6.5 8-15.3v-0.2c0-4.4-3.6-8-8-8" />
    </svg>
  );
}

Pin.displayName = "SVG.Pin";

Pin.propTypes = {
  ...svgInternalShape,
};
