import PropTypes from "prop-types";

const localeShape = PropTypes.shape({
  site: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  subdirectory: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

export default localeShape;

export const localizedShape = PropTypes.arrayOf(
  PropTypes.shape({
    uri: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  })
);
