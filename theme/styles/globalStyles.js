/* eslint-disable */
import { fluidScaleBase, stripUnit, respondBase } from "@castiron/style-mixins";
import { tokens } from "@rubin-epo/epo-react-lib/styles";

export const zStack = {
  dialog: 35,
  header: 25,
};

export const white = tokens.white;
export const offWhite = tokens.offWhite;
export const neutral02 = tokens.neutral02;
export const neutral08 = tokens.neutral08;
export const neutral10 = tokens.neutral10;
export const neutral15 = tokens.neutral15;
export const neutral20 = tokens.neutral20;
export const neutral30 = tokens.neutral30;
export const neutral40 = tokens.neutral40;
export const neutral60 = tokens.neutral60;
export const neutral80 = tokens.neutral80;
export const neutral90 = tokens.neutral90;
export const black = tokens.black;
export const orange20 = tokens.orange20;
export const orange55 = tokens.orange55;
export const turquoise10 = tokens.turquoise10;
export const turquoise20 = tokens.turquoise20;
export const turquoise50 = tokens.turquoise50;
export const turquoise55 = tokens.turquoise55;
export const turquoise60 = tokens.turquoise60;
export const turquoise70 = tokens.turquoise70;
export const turquoise80 = tokens.turquoise80;
export const turquoise85 = tokens.turquoise85;
export const turquoise90 = tokens.turquoise90;
export const blue10 = tokens.blue10;
export const red = tokens.red;
export const red20 = tokens.red20;
export const red40 = tokens.red40;
export const green20 = "#E6FFE6";
export const BREAK_HEADER_LAYOUT = tokens.BREAK_HEADER_LAYOUT;
export const BREAK_DESKTOP = tokens.BREAK_DESKTOP;
export const BREAK_DESKTOP_SMALL = tokens.BREAK_DESKTOP_SMALL;
export const BREAK_LARGE_TABLET = tokens.BREAK_LARGE_TABLET;
export const BREAK_LARGE_TABLET_MIN = tokens.BREAK_LARGE_TABLET_MIN;
export const BREAK_TABLET = tokens.BREAK_TABLET;
export const BREAK_TABLET_MIN = tokens.BREAK_TABLET_MIN;
export const BREAK_PHABLET = tokens.BREAK_PHABLET;
export const BREAK_PHABLET_MIN = tokens.BREAK_PHABLET_MIN;
export const BREAK_MOBILE = tokens.BREAK_MOBILE;
export const BREAK_MOBILE_MIN = tokens.BREAK_MOBILE_MIN;
export const CONTAINER_MAX = tokens.CONTAINER_MAX;
export const CONTAINER_FULL = tokens.CONTAINER_FULL;
export const CONTAINER_WIDE = tokens.CONTAINER_WIDE;
export const CONTAINER_REGULAR = tokens.CONTAINER_REGULAR;
export const CONTAINER_NARROW = tokens.CONTAINER_NARROW;
export const FONT_SIZE_BASE_DESKTOP = tokens.FONT_SIZE_BASE_DESKTOP;
export const FONT_SIZE_BASE_MOBILE = tokens.FONT_SIZE_BASE_MOBILE;
export const FONT_STACK_BASE = tokens.FONT_STACK_BASE;
export const LINE_HEIGHT_BASE = tokens.LINE_HEIGHT_BASE;
export const PADDING_LARGE = tokens.PADDING_LARGE;
export const PADDING_MEDIUM = tokens.PADDING_MEDIUM;
export const PADDING_SMALL = tokens.PADDING_SMALL;

export function fluidScale(
  max,
  min,
  maxVw = tokens.BREAK_DESKTOP,
  minVw = tokens.BREAK_TABLET
) {
  if (max === min) return max;
  return fluidScaleBase(max, min, maxVw, minVw);
}

export const containerMax = () => protoContainer(tokens.CONTAINER_MAX);

export const containerFull = () => protoContainer(tokens.CONTAINER_FULL);

export const containerFullBleed = (width = "CONTAINER_MAX") => {
  return `
    width: 100%;
    max-width: ${tokens[width]};
    margin-right: auto;
    margin-left: auto;
  `;
};

export const containerWide = () => protoContainer(tokens.CONTAINER_WIDE);

export const containerNews = () =>
  protoContainer(tokens.CONTAINER_WIDE, "110px", "50px");

export const containerRegular = () => protoContainer(tokens.CONTAINER_REGULAR);

export const containerNarrow = () => protoContainer(tokens.CONTAINER_NARROW);

export const layoutGrid = (
  columns = 3,
  gapDesktop = tokens.PADDING_SMALL,
  gapMobile = tokens.PADDING_SMALL,
  breakPoint = tokens.BREAK_TABLET
) => {
  return `
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: ${fluidScale(gapDesktop, gapMobile)};

  ${respond(
    `& > * {
      grid-column: span ${columns};
    }`,
    breakPoint
  )}
  `;
};

export const encodeColor = (string) => {
  const str = string.split("#").pop();
  return `%23${str}`;
};

export const needsDarkColor = (hexColor) => {
  var color = hexColor.charAt(0) === "#" ? hexColor.substring(1, 7) : hexColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? true : false;
};

export const palette = (color) => {
  return tokens[color];
};

export const protoContainer = (
  maxWidth = tokens.CONTAINER_WIDE,
  widePadding = tokens.PADDING_LARGE,
  narrowPadding = tokens.PADDING_SMALL
) => {
  const units = widePadding.toString().split(/\d+/);
  const unit = units?.[0] || "px";
  const maxValue = stripUnit(maxWidth) + 2 * stripUnit(widePadding);
  const minValue = stripUnit(maxWidth) + 2 * stripUnit(narrowPadding);

  return `
    max-width: ${fluidScale(maxValue + unit, minValue + unit)};
    padding-right: ${fluidScale(widePadding, narrowPadding)};
    padding-left: ${fluidScale(widePadding, narrowPadding)};
    margin-right: auto;
    margin-left: auto;
    `;
};

export const pxToEm = (px, base = tokens.FONT_SIZE_BASE_DESKTOP) => {
  return `${stripUnit(px) / stripUnit(base)}em`;
};

// Converts pt to em
// pt values are rounded down to the nearest px
export const ptToEm = (pt, base = tokens.FONT_SIZE_BASE_DESKTOP) => {
  return `${Math.floor(stripUnit(pt) * 1.333) / stripUnit(base)}em`;
};

export const respond = (
  content,
  size = tokens.BREAK_TABLET,
  operator = "max",
  aspect = "width"
) => {
  return respondBase(content, size, operator, aspect);
};
