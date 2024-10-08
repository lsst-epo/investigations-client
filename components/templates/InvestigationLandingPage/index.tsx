import { ReactNode, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { imageShaper } from "@/helpers";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import SignedIn from "@/components/organisms/auth/LandingSignedIn";
import SignedOut from "@/components/organisms/auth/LandingSignedOut";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InvestigationLandingPageTemplate on investigations_investigationParent_Entry {
    title
    image {
      url {
        directUrlPreview
        directUrlOriginal
        PNG
        HighJPG
        LowJPG
      }
      width
      height
      metadata: additional {
        AltTextEN
        AltTextES
        CaptionEN
        CaptionES
        Credit
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
  locale: string;
  user: ReturnType<typeof getUserFromJwt>;
  status?: string;
  children?: ReactNode;
}> = async ({ locale, site, user, status, investigation, ...props }) => {
  const { title, image, children } = useFragment(Fragment, props.data);
  const { uri: firstPage } = children?.[0];

  if (!title) return null;

  return (
    <Styled.PageContainer
      bgColor="orange05"
      paddingSize="medium"
      width="narrow"
    >
      <h1>{title}</h1>
      {image.length > 0 && <Styled.Image image={imageShaper(site, image[0])} />}
      {firstPage && (
        <Styled.AuthWrapper>
          {user ? (
            <SignedIn
              {...{ status, firstPage, locale }}
              name={user.fullName || user.email}
              signOutRedirect={`/${investigation}`}
            />
          ) : (
            <SignedOut {...{ firstPage, locale }} />
          )}
          {props.children}
        </Styled.AuthWrapper>
      )}
    </Styled.PageContainer>
  );
};

InvestigationLandingPage.displayName = "Template.InvestigationLandingPage";

export default InvestigationLandingPage;
