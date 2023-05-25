"use client";
import { FunctionComponent, ReactNode } from "react";
import PageData from "@/shapes/page";
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
  );
};

Page.displayName = "Template.Page";

export default Page;
