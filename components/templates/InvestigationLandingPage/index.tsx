"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import * as Styled from "./styles";

const InvestigationLandingPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  investigation: string;
  children?: React.ReactNode;
}> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Styled.LandingPageContainer>
      <Styled.Heading>{data.title}</Styled.Heading>
      {props.children}
      {data.children?.[0]?.uri && (
        <>
          <Styled.WithoutLoginLink
            className="wo-sign-in"
            styleAs="tertiary"
            url={`/${data.children[0].uri}`}
            text="Start the investigation logged out"
          />
          <Styled.LinkLabel>
            You can still save your work, but it will get lost if the browser’s
            cache is erased.
          </Styled.LinkLabel>
        </>
      )}
    </Styled.LandingPageContainer>
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
