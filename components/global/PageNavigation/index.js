import PropTypes from "prop-types";
import Link from "next/link";

export default function PageNavigation({ prev, next, level }) {
  const isIntroduction = level === 1;
  const isLastPage = next && next.level < level;

  return (
    <div>
      {prev && !isIntroduction && (
        <Link href={prev.uri}>{`← ${prev.title}`}</Link>
      )}
      {prev && next && !isIntroduction && !isLastPage && ` | `}
      {next && !isLastPage && <Link href={next.uri}>{`${next.title} →`}</Link>}
    </div>
  );
}

PageNavigation.displayName = "Global.PageNavigation";

PageNavigation.propTypes = {
  prev: PropTypes.object,
  next: PropTypes.object,
  level: PropTypes.number,
};
