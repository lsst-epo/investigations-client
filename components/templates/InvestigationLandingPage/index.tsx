"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql";
import Container from "@rubin-epo/epo-react-lib/Container";

const InvestigationLandingPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  children?: React.ReactNode;
}> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Container>
      <h1>{data.title}</h1>
      {props.children}
    </Container>
  );
};

InvestigationLandingPage.displayName = "Template.InvestigationLandingPage";

export default InvestigationLandingPage;

const Fragment = graphql(`
  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {
    title
  }
`);
