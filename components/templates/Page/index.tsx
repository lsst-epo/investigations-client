"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import Container from "@rubin-epo/epo-react-lib/Container";
import QuestionsContentBlock from "@/components/content-blocks/Questions";

const Fragment = graphql(`
  fragment PageTemplate on pages_pages_Entry {
    id
    title
    contentBlocks {
      ...ContentBlockFactory
    }
  }
`);

const Page: FunctionComponent<{ data: FragmentType<typeof Fragment> }> = (
  props
) => {
  const data = useFragment(Fragment, props.data);

  if (!data) return null;

  return (
    <Container>
      <h1>{data.title}</h1>
      {data.contentBlocks?.map(
        (block, i) => block && <ContentBlockFactory key={i} data={block} />
      )}
      <QuestionsContentBlock />
    </Container>
  );
};

Page.displayName = "Template.Page";

export default Page;
