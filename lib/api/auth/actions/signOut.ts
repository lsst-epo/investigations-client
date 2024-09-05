"use server";

import { redirect } from "next/navigation";
import { graphql } from "@/gql/public-schema";
import {
  deleteAuthCookies,
  getAuthCookies,
} from "@/components/auth/serverHelpers";
import { mutateAPI } from "@/lib/fetch";

const Mutation = graphql(`
  mutation DeleteRefreshToken($refreshToken: String!) {
    deleteRefreshToken(refreshToken: $refreshToken)
  }
`);

async function signOut(redirectTo: string) {
  const { craftRefreshToken, craftToken } = await getAuthCookies();

  if (craftRefreshToken && craftToken) {
    await mutateAPI({
      query: Mutation,
      variables: {
        refreshToken: craftRefreshToken,
      },
      token: craftToken,
    });
  }

  deleteAuthCookies();
  redirect(redirectTo);
}

export default signOut;
