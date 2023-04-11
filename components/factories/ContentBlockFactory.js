import PropTypes from "prop-types";
import { Image, Text } from "@/content-blocks";

const blockMap = {
  text: Text,
  image: Image,
};

export default function ContentBlockFactory({ type, data, pageId }) {
  const Block = blockMap[type];
  if (!Block) return null;
  return <Block {...data} pageId={pageId} />;
}

ContentBlockFactory.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
};
