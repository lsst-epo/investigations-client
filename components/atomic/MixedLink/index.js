import PropTypes from "prop-types";
import Link from "next/link";
import ExternalLink from "@/atomic/ExternalLink";
import { mixedLinkInternalShape } from "@/shapes/link";
import { normalizePathData } from "@/lib/utils";
import { isInternalUrl } from "@/helpers";

export default function MixedLink({
  children,
  className,
  customText,
  element,
  params,
  text,
  url,
  ...restProps
}) {
  if (!isInternalUrl(url)) {
    return (
      <ExternalLink href={url} className={className} {...restProps}>
        {!children && (customText ?? text)}
        {children}
      </ExternalLink>
    );
  } else {
    const pathnameInput = element?.uri || url || "/";
    const { pathname, pathParams } = normalizePathData(pathnameInput);

    const href = {
      pathname: pathname,
      query: { ...pathParams, ...params },
    };

    return (
      <Link href={href}>
        <a className={className} {...restProps}>
          {!children && (customText ?? text)}
          {children}
        </a>
      </Link>
    );
  }
}

MixedLink.displayName = "Atomic.MixedLink";

MixedLink.propTypes = {
  ...mixedLinkInternalShape,
  className: PropTypes.string,
};
