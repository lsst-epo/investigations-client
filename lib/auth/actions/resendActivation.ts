"use server";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import { graphql } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { cookies } from "next/headers";

// https://graphql-authentication.jamesedmonston.co.uk/usage/authentication#resend-activation-email
const Mutation = graphql(`
  mutation ResendActivation($email: String!) {
    resendActivation(email: $email)
  }
`);

export default async function resendActivationEmail() {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);
  const email = (await cookies()).get("userToResend")?.value;
  const emailToUse = email || user?.email;

  if (!emailToUse) {
    return;
  }

  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: {
      email: emailToUse,
    },
  });

  if (data?.resendActivation) {
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}
