import PropTypes from "prop-types";

const imageShape = PropTypes.shape({
  altText: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  url: PropTypes.string,
  url2x: PropTypes.string,
  url3x: PropTypes.string,
  thumb: PropTypes.string,
  thumb2x: PropTypes.string,
  className: PropTypes.string,
  focalPointX: PropTypes.integer,
  focalPointY: PropTypes.integer,
}).isRequired;

export default imageShape;
