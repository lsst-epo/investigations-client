"use client";

import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { imageShaper } from "@/helpers";
import * as Styled from "./styles";
// fluidScaleBase(max, min, maxVw, minVw)
const InvestigationLandingPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  investigation: string;
  children?: React.ReactNode;
}> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Styled.LandingPageContainer bgColor="orange05" paddingSize="medium">
      <h1>{data.title}</h1>
      {data.image && (
        <Styled.Image image={imageShaper(props.site, data.image[0])} />
      )}
      <Styled.AuthWrapper>
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
              You can still save your work, but it will get lost if the
              browser’s cache is erased.
            </Styled.LinkLabel>
          </>
        )}
      </Styled.AuthWrapper>
    </Styled.LandingPageContainer>
  );
};

InvestigationLandingPage.displayName = "Template.InvestigationLandingPage";

export default InvestigationLandingPage;

const Fragment = graphql(`
  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {
    title
    image {
      url {
        directUrlPreview
      }
      width
      height
      additional {
        AltTextEN
        AltTextES
      }
    }
    children {
      uri
    }
  }
`);
