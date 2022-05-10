import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import pageShape from "@/shapes/page";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import Container from "@/layout/Container";

export default function Page({
  data: { id, pageType, title, contentBlocks = [], uri, typeHandle },
  children,
}) {
  const { t } = useTranslation();
  const bodyProps = {
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
    active: true,
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
      </Container>
    </Body>
  );
}

Page.displayName = "Template.Page";

Page.propTypes = {
  data: pageShape,
  children: PropTypes.node,
};
