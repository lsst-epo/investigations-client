"use server";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";

// https://graphql-authentication.jamesedmonston.co.uk/usage/authentication#resend-activation-email
const Mutation = graphql(`
  mutation ResendActivation($email: String!) {
    resendActivation(email: $email)
  }
`);

export async function resendActivationEmail() {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  if (!user) {
    return;
  }

  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: {
      email: user.email,
    },
  });

  if (data?.resendActivation) {
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}
