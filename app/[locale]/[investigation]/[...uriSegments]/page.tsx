import { graphql } from "@/gql/public-schema";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
import { UriSegmentsProps } from "./layout";

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

export async function generateMetadata({
  params: { locale, uriSegments },
}: {
  params: { locale: string; uriSegments: string[] };
}): Promise<Metadata> {
  const site = locale === "en" ? "default" : locale;
  // add _es to property names if site is not English
  const uri: string = uriSegments.join("/");

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

const UriSegments: (props: UriSegmentsProps) => Promise<JSX.Element> = async ({
  params: { locale, investigation, uriSegments },
}) => {
  const site = locale === "en" ? "default" : locale;
  // // add _es to property names if site is not English
  const uri = `${investigation}/${uriSegments.join("/")}`;

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
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

export default UriSegments;
