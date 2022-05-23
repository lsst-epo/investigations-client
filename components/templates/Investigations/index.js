import PropTypes from "prop-types";
import Link from "next/link";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Container from "@/layout/Container";

export default function Investigations({
  data: {
    id,
    pageType,
    contentBlocks,
    title,
    uri,
    typeHandle,
    next,
    prev: prevPage,
    children,
  },
}) {
  const bodyProps = {
    title,
  };
  const nextPage = children[0] || next;

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
        {(nextPage || prevPage) && (
          <footer>
            {prevPage && <Link href={prevPage.uri}>Previous</Link>}
            {nextPage && <Link href={nextPage.uri}>Next</Link>}
          </footer>
        )}
      </Container>
    </Body>
  );
}

Investigations.displayName = "Template.Investigations";

Investigations.propTypes = {
  data: PropTypes.object,
};
