import PropTypes from "prop-types";
import Link from "next/link";

export default function InvestigationsListBlock({ investigations }) {
  return (
    <ul>
      {investigations.map(({ investigation }) => {
        const { title, url } = investigation[0];

        return (
          <li>
            <Link href={url}>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

InvestigationsListBlock.displayName = "ContentBlock.InvestigationsList";

InvestigationsListBlock.propTypes = {
  investigations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
