import PropTypes from "prop-types";

export const internalLinkInternalShape = {
  id: PropTypes.string.isRequired,
  uri: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const internalLinkShape = PropTypes.shape(internalLinkInternalShape);

export const internalLinkWithChildrenShape = PropTypes.shape({
  ...internalLinkInternalShape,
  children: PropTypes.arrayOf(internalLinkShape),
});

export const mixedLinkInternalShape = {
  type: PropTypes.string,
  url: PropTypes.string,
  customText: PropTypes.string,
  text: PropTypes.string,
  target: PropTypes.oneOf(["_self", "_blank"]),
  element: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  tabIndex: PropTypes.number,
};

export const mixedLinkShape = PropTypes.shape({
  ...mixedLinkInternalShape,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
});

export default internalLinkShape;

export const linksShape = PropTypes.arrayOf(
  PropTypes.shape({
    mixedLink: mixedLinkShape,
  })
);
