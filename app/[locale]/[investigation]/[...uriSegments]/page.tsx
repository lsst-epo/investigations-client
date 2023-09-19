import { graphql } from "@/gql/public-schema";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import SignOut from "@/components/auth/buttons/SignOut";
import InvestigationChildPageTemplate from "@/components/templates/InvestigationChildPage";
import { queryAPI } from "@/lib/fetch";

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
      __typename
      ...InvestigationChildPageTemplate
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

const UriSegments: (props: {
  params: { locale: string; investigation: string; uriSegments: string[] };
}) => Promise<JSX.Element> = async ({
  params: { locale, investigation, uriSegments },
  // previewData
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

  if (data?.entry?.__typename !== "investigations_default_Entry") {
    notFound();
  }

  const { craftToken, craftUserStatus } = await getAuthCookies();

  const user = getUserFromJwt(craftToken);

  return (
    <InvestigationChildPageTemplate data={data.entry} user={user}>
      {user && (
        <>
          <p>User: {JSON.stringify(user)}</p>
          {craftUserStatus && <p>Status: {craftUserStatus}</p>}
          {/* @ts-expect-error Server Component */}
          <SignOut redirectTo={`/${investigation}`} />
        </>
      )}
    </InvestigationChildPageTemplate>
  );
};

export default UriSegments;
