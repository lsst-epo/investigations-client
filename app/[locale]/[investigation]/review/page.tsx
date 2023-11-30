import { FunctionComponent } from "react";
import type { Metadata } from "next";
import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { serverTranslation } from "@/lib/i18n";
import { ReviewPageProps } from "./layout";

import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import ReviewTemplate from "@/components/templates/ReviewPage";
import { getSite } from "@/helpers";

const Query = graphql(`
  query ReviewPage($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ... on investigations_investigationParent_Entry {
        title
      }
    }
  }
`);

export async function generateMetadata({
  params: { locale },
}: ReviewPageProps): Promise<Metadata> {
  const { t } = await serverTranslation(locale, "translation");
  return {
    title: t("review.metadata.title"),
  };
}

const ReviewPage: FunctionComponent<ReviewPageProps> = async ({
  params: { locale, investigation },
}) => {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);
  const site = getSite(locale);

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  return (
    <ReviewTemplate investigation={data?.entry?.title} {...{ user, locale }} />
  );
};

export default ReviewPage;
