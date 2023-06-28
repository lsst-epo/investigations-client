import { graphql } from "@/gql";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import SignOut from "@/components/auth/buttons/SignOut";
import { queryAPI } from "@/lib/fetch";

export const revalidate = 60;

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
  const uri: string = uriSegments.join("/");

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
  });

  // return data?.entry ? <TemplateFactory data={data.entry} /> : notFound();

  const { craftToken, craftRefreshToken, craftUserStatus } = getAuthCookies();

  // if stored refresh token has expired, redirect to investigation landing page
  if (!craftRefreshToken) redirect(`/${investigation}`);

  const user = getUserFromJwt(craftToken);

  return (
    <>
      <h1>This is an authorized route</h1>
      <p>User: {JSON.stringify(user)}</p>
      {craftUserStatus && <p>Status: {craftUserStatus}</p>}
      {/* @ts-expect-error Server Component */}
      <SignOut redirectTo={`/${investigation}`} />
    </>
  );
};

export default UriSegments;

const MetadataQuery = graphql(`
  query UriSegmentsMetadata($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      title
    }
  }
`);

const Query = graphql(`
  query UriSegmentsQuery($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ...TemplateFactory
    }
  }
`);
