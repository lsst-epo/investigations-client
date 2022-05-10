import PropTypes from "prop-types";

const pageShape = PropTypes.shape({
  id: PropTypes.string,
  uri: PropTypes.string,
  title: PropTypes.string.isRequired,
  contentBlocks: PropTypes.arrayOf(PropTypes.object),
  pageType: PropTypes.string.isRequired,
  typeHandle: PropTypes.oneOf(["pages"]),
}).isRequired;

export default pageShape;
