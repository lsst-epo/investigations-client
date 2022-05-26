import PropTypes from "prop-types";
import Link from "next/link";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Container from "@/layout/Container";
import PageNavigation from "@/components/global/PageNavigation";

export default function Investigations({
  data: {
    id,
    pageType,
    contentBlocks,
    title,
    uri,
    typeHandle,
    next,
    prev,
    level,
  },
}) {
  const bodyProps = {
    title,
  };

  return (
    <Body {...bodyProps}>
      <Container>
        <h1>{title}</h1>
        {[...contentBlocks].map((block) => {
          if (!block.id || !block.typeHandle) return null;
          return (
            <ContentBlockFactory
              key={block.id}
              type={block.typeHandle}
              data={block}
              pageId={id}
            />
          );
        })}
        <PageNavigation {...{ prev, next, level }}></PageNavigation>
      </Container>
    </Body>
  );
}

Investigations.displayName = "Template.Investigations";

Investigations.propTypes = {
  data: PropTypes.object,
};
