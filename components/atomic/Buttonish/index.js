import PropTypes from "prop-types";
import Link from "next/link";
import { isInternalUrl } from "@/helpers";
import Button from "../Button";

export default function Buttonish({ text, url, ...props }) {
  if (!isInternalUrl(url)) {
    return (
      <Button as="a" href={url} {...props}>
        {text}
      </Button>
    );
  } else if (url) {
    return (
      <Link href={url} passHref>
        <Button as="a" {...props}>
          {text}
        </Button>
      </Link>
    );
  } else {
    return null;
  }
}

Buttonish.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
};
