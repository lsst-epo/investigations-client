import PropTypes from "prop-types";

const rootPagesShape = PropTypes.arrayOf(
  PropTypes.shape({
    header: PropTypes.string,
    allEntries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        uri: PropTypes.string,
      })
    ),
  })
);

export default rootPagesShape;
