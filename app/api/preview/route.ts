// route handler with secret and slug
import { graphql } from "@/gql/public-schema";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { queryAPI } from "@/lib/fetch";
import { getSite } from "@/helpers";

const PREVIEW_SECRET_TOKEN = process.env.CRAFT_SECRET_TOKEN;

const Query = graphql(`
  query PagePreviewQuery($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      __typename
      uri
      title
    }
  }
`);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const isLivePreview = !!searchParams.get("x-craft-live-preview");
  const secret = searchParams.get("secret");
  const previewToken = searchParams.get("token");
  const site = getSite((searchParams.get("site") || "en").toLowerCase());
  const uri = searchParams.get("uri");
  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== PREVIEW_SECRET_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!uri) {
    return new Response("URI missing", { status: 401 });
  }

  // Should only preview page if craft is in Preview Mode
  // if (!isLivePreview) {
  //   return new Response("Only available in preview mode", { status: 401 });
  // }

  // Fetch the headless CMS to check if the provided `uri` exists

  const res = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
    previewToken,
  });

  // If the uri doesn't exist prevent draft mode from being enabled
  if (!res?.data?.entry?.uri) {
    return new Response("Invalid uri", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  (await draftMode()).enable();

  // Redirect to the path from the fetched entry
  // We don't redirect to searchParams.uri as that might lead to open redirect vulnerabilities

  redirect(
    site === "default"
      ? `/${res.data.entry.uri}/?preview=${previewToken}`
      : `/${site}/${res.data.entry.uri}/?preview=${previewToken}`,
    "replace"
  );
}
