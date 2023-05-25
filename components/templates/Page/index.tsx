"use client";
import { FunctionComponent, ReactNode } from "react";
import PageData from "@/shapes/page";
import Body from "@/global/Body";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import { Container } from "@rubin-epo/epo-react-lib";

interface PageProps {
  data: PageData;
  children: ReactNode;
}

const Page: FunctionComponent<PageProps> = ({
  data: { id, title, contentBlocks = [], uri },
}) => {
  return (
    <Body>
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
};

Page.displayName = "Template.Page";

export default Page;
