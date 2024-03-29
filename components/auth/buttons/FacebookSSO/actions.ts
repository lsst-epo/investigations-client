"use server";

import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";

const FacebookOauthUrlQuery = graphql(`
  query FacebookOauthUrl {
    facebookOauthUrl
  }
`);

export async function getOauthUrl() {
  const { data, error } = await queryAPI({
    query: FacebookOauthUrlQuery,
    variables: {},
  });

  if (data?.facebookOauthUrl) {
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}
