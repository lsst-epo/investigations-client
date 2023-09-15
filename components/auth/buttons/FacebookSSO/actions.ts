"use server";

import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";

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

const FacebookOauthUrlQuery = graphql(`
  query FacebookOauthUrl {
    facebookOauthUrl
  }
`);
