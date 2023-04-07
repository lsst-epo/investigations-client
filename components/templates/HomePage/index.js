import PropTypes from "prop-types";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import { Container } from "@rubin-epo/epo-react-lib";
import Header from "@/components/global/Header";
export default function HomePage({ data: { id, title, contentBlocks = [] } }) {
  const bodyProps = {
    title,
  };
  return (
    <Body {...bodyProps}>
      <Container>
        <Header />
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

HomePage.displayName = "Template.HomePage";

HomePage.propTypes = {
  data: PropTypes.object,
};
