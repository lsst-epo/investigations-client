"use client";

import { ReactNode, FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import { imageShaper } from "@/helpers";
import { useTranslation } from "react-i18next";
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
  children?: ReactNode;
}> = ({ ...props }) => {
  const { title, image, children } = useFragment(Fragment, props.data);
  const { t } = useTranslation();

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
              text={t("auth.continue_wo_login_button")}
            />
            <Styled.LinkLabel>
              {t("auth.continue_wo_login_label")}
            </Styled.LinkLabel>
          </>
        )}
      </Styled.AuthWrapper>
    </Styled.LandingPageContainer>
  );
};

InvestigationLandingPage.displayName = "Template.InvestigationLandingPage";

export default InvestigationLandingPage;
