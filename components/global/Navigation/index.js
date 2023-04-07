import PropTypes from "prop-types";
import Link from "next/link";
import internalLinkShape from "@/shapes/link";

export default function Navigation({ items }) {
  return (
    <div className="c-content-block">
      <div className="c-content-block__inner">
        <ul>
          {items.map(({ id, title, uri }) => (
            <li key={id}>
              <Link href={`/${uri}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Navigation.displayName = "Global.Navigation";

Navigation.propTypes = {
  items: PropTypes.arrayOf(internalLinkShape),
};
