"use server";

import { queryAPI } from "@/lib/fetch";
import { getAuthCookies, getUserFromJwt } from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/educator-schema";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const SECRET_TOKEN = process.env.CRAFT_EDUCATOR_SCHEMA_SECRET_TOKEN;

const AssessmentMenuItemQuery = graphql(`
  query AssessmentMenuItem($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      __typename
      ... on investigations_investigationParent_Entry {
        title
        relatedAssessments(limit: 1) {
          __typename
          ... on assessments_default_Entry {
            uri
          }
        }
      }
    }
  }
`);

export default async function getAssessmentUri({ investigation, site }: {
  investigation: string,
  site?: string
}) {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  if (user?.group !== "educators") return null;

  const { data, error } = await queryAPI({
    query: AssessmentMenuItemQuery,
    variables: {
      site,
      uri: [investigation],
    },
    authToken: SECRET_TOKEN,
    token: craftToken
  });

  const relatedAssessment =
    data?.entry?.__typename === "investigations_investigationParent_Entry"
      ? data.entry.relatedAssessments?.[0]
      : null;

  return relatedAssessment?.__typename === "assessments_default_Entry"
    ? relatedAssessment.uri ?? null
    : null;
}
