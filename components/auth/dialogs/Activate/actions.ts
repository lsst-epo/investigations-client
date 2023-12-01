"use server";

import { cookies } from "next/headers";
import { graphql } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { refreshToken } from "../../serverHelpers";

// https://graphql-authentication.jamesedmonston.co.uk/usage/authentication#activate-user
const Mutation = graphql(`
  mutation ActivateUser($code: String!, $id: String!) {
    activateUser(code: $code, id: $id)
  }
`);

export async function activate(code: string, id: string) {
  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: {
      code: code as string, // safe to assert since doActivation won't run if null
      id: id as string, // safe to assert since doActivation won't run if null
    },
  });

  if (data?.activateUser) {
    const token = cookies().get("craftRefreshToken")?.value; // check if there is a user already logged in

    if (token) {
      // refresh cookies to get the updated user status
      await refreshToken(token);
    }

    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}
