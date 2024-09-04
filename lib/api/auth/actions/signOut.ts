"use server";

import { redirect } from "next/navigation";
import { graphql } from "@/gql/public-schema";
import {
  deleteAuthCookies,
  getAuthCookies,
} from "@/components/auth/serverHelpers";
import { queryAPI } from "@/lib/fetch";

const Mutation = graphql(`
  mutation DeleteRefreshToken($refreshToken: String!) {
    deleteRefreshToken(refreshToken: $refreshToken)
  }
`);

export async function signOut(redirectTo: string) {
  const { craftRefreshToken } = await getAuthCookies();

  const { data, error } = queryAPI({
    query: Mutation,
    variables: {
      refreshToken: craftRefreshToken,
    },
  });

  deleteAuthCookies();
  redirect(redirectTo);
}
