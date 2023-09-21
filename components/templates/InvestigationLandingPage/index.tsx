"use client";

import { ReactNode, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { imageShaper } from "@/helpers";
import * as Styled from "./styles";

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

const InvestigationLandingPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  investigation: string;
  children?: ReactNode;
}> = (props) => {
  const { title, image, children } = useFragment(Fragment, props.data);

  if (!title) return null;

  return (
    <Styled.LandingPageContainer bgColor="orange05" paddingSize="medium">
      <h1>{title}</h1>
      {image.length > 0 && (
        <Styled.Image image={imageShaper(props.site, image[0])} />
      )}
      <Styled.AuthWrapper>
        {props.children}
        {children?.[0]?.uri && (
          <>
            <Styled.WithoutLoginLink
              className="wo-sign-in"
              styleAs="tertiary"
              url={`/${children[0].uri}`}
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
