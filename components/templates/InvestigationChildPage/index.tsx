"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Buttonish } from "@rubin-epo/epo-react-lib";

const InvestigationChildPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  children?: React.ReactNode;
}> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <>
      <Container>
        <h1>{data.title}</h1>
        {props.children}
        {data.contentBlocks?.map(
          (block, i) => block && <ContentBlockFactory key={i} data={block} />
        )}
        <nav>
          <Buttonish text="Previous" url={data.prev?.uri ?? undefined} />
          <Buttonish text="Next" url={data.next?.uri ?? undefined} />
        </nav>
      </Container>
    </>
  );
};

InvestigationChildPage.displayName = "Template.InvestigationChildPage";

export default InvestigationChildPage;

const Fragment = graphql(`
  fragment InvestigationChildPageTemplate on investigations_default_Entry {
    title
    contentBlocks {
      ...ContentBlockFactory
    }
    prev(section: "investigations") {
      uri
    }
    next(section: "investigations") {
      uri
    }
  }
`);
