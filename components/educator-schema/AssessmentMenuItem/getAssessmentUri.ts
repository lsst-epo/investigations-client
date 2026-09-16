"use server";

import { queryAPI } from "@/lib/fetch";
import { getAuthCookies } from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/educator-schema";
import { getSite } from "@/helpers";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const SECRET_TOKEN = process.env.CRAFT_EDUCATOR_SCHEMA_SECRET_TOKEN;

const AssessmentMenuItemQuery = graphql(`
  query AssessmentMenuItem($site: [String], $slug: [String]) {
    entry(site: $site, slug: $slug) {
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

export default async function getAssessmentUri(
  investigation: string,
  locale?: string
) {
  const { craftToken } = await getAuthCookies();

  const { data, error } = await queryAPI({
    query: AssessmentMenuItemQuery,
    variables: {
      site: [getSite(locale)],
      slug: [investigation],
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
