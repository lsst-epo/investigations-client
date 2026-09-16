"use server";

import { queryAPI } from "@/lib/fetch";
import { getAuthCookies } from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/educator-schema";
import { getSite } from "@/helpers";

const AssessmentMenuItemQuery = graphql(`
  query AssessmentMenuItem($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ... on investigations_investigationParent_Entry {
        __typename
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


  if (!craftToken) return null;

  const { data, error } = await queryAPI({
    query: AssessmentMenuItemQuery,
    variables: {
      site: [getSite(locale)],
      uri: [investigation],
    },
    token: craftToken,
  });

  console.debug({ getAssessmentUri: craftToken, investigation, error, data })

  const relatedAssessment =
    data?.entry?.__typename === "investigations_investigationParent_Entry"
      ? data.entry.relatedAssessments?.[0]
      : null;

  return relatedAssessment?.__typename === "assessments_default_Entry"
    ? relatedAssessment.uri ?? null
    : null;
}
