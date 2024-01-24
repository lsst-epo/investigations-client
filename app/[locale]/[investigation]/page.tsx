import { notFound } from "next/navigation";
import { graphql } from "@/gql/public-schema";
import { draftMode } from "next/headers";
import { InvestigationLandingProps } from "./layout";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import { queryAPI } from "@/lib/fetch";
import InvestigationLandingPageTemplate from "@/components/templates/InvestigationLandingPage";
import { getSite } from "@/helpers";

const Query = graphql(`
  query InvestigationPage($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      __typename
      ...InvestigationLandingPageTemplate
    }
  }
`);

const InvestigationLanding: (
  props: InvestigationLandingProps
) => Promise<JSX.Element> = async ({
  params: { locale, investigation },
  searchParams,
}) => {
  const site = getSite(locale);
  const { preview: previewToken } = searchParams;
  const { isEnabled: isPreview } = draftMode();

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [investigation],
    },
    previewToken: isPreview && previewToken,
  });

  if (data?.entry?.__typename !== "investigations_investigationParent_Entry") {
    notFound();
  }

  const { craftToken, craftUserStatus } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  return (
    <InvestigationLandingPageTemplate
      data={data.entry}
      status={craftUserStatus}
      {...{ investigation, site, locale, user }}
    />
  );
};

export default InvestigationLanding;
