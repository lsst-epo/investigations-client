import type { Metadata } from "next";
import { graphql } from "@/gql/public-schema";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import { queryAPI } from "@/lib/fetch";
import {
  InvestigationChildPage,
  InvestigationSectionBreakPage,
} from "@/components/templates";
import { FunctionComponent } from "react";
import { InvestigationPageProps } from "./layout";
import { getSite } from "@/helpers";

export const revalidate = 60;

const MetadataQuery = graphql(`
  query InvestigationChildPageMetadata($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      title
    }
  }
`);

const Query = graphql(`
  query InvestigationChildPage($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ...InvestigationChildPageTemplate
      ...InvestigationSectionBreakTemplate
    }
  }
`);

export async function generateMetadata(props: InvestigationPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    investigation,
    page
  } = params;

  const site = getSite(locale);
  // add _es to property names if site is not English
  const uri = `${investigation}/${page}`;

  const { data } = await queryAPI({
    query: MetadataQuery,
    variables: {
      site: [site],
      uri: [uri],
    },
  });

  const title = data?.entry?.title;

  return title ? { title, twitter: { title } } : {};
}

const InvestigationPage: FunctionComponent<InvestigationPageProps> = async props => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const {
    locale,
    investigation,
    page
  } = params;

  const site = getSite(locale);
  const { preview: previewToken } = searchParams;
  const { isEnabled: isPreview } = await draftMode();
  const uri = `${investigation}/${page}`;

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
    previewToken: isPreview && previewToken,
  });

  if (!data) {
    notFound();
  }

  const { entry } = data;
  const { __typename } = entry || {};

  const Templates: Record<string, FunctionComponent<any>> = {
    investigations_default_Entry: InvestigationChildPage,
    investigations_investigationSectionBreakChild_Entry:
      InvestigationSectionBreakPage,
  };

  const Template = Templates[__typename as string];

  if (!Template) {
    notFound();
  }

  const { craftToken, craftUserStatus } = await getAuthCookies();

  const user = getUserFromJwt(craftToken);

  return (
    <Template
      {...{ site, user, locale }}
      data={entry}
      userStatus={craftUserStatus}
    />
  );
};

export default InvestigationPage;
