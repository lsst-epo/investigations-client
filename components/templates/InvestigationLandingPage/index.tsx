"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql";
import Container from "@rubin-epo/epo-react-lib/Container";
import Link from "next/link";

const InvestigationLandingPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  investigation: string;
  children?: React.ReactNode;
}> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Container>
      <h1>{data.title}</h1>
      {data.children?.[0]?.uri && (
        <p>
          <Link href={`/${data.children[0].uri}`}>Start investigation</Link>
        </p>
      )}
      {props.children}
    </Container>
  );
};

InvestigationLandingPage.displayName = "Template.InvestigationLandingPage";

export default InvestigationLandingPage;

const Fragment = graphql(`
  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {
    title
    children {
      uri
    }
  }
`);
