import PropTypes from "prop-types";

export default function ExternalLink({
  href,
  children,
  type: typeIgnored,
  ...restProps
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...restProps}>
      {children}
    </a>
  );
}

ExternalLink.displayName = "Atomic.ExternalLink";

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
