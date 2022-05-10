import PropTypes from "prop-types";

export const svgInternalShape = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stroke: PropTypes.string,
  fill: PropTypes.string,
  svgProps: PropTypes.object,
};

const svgShape = PropTypes.shape({
  ...svgInternalShape,
});

export default svgShape;
