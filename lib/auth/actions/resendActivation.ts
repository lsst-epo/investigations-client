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
  const email = (await cookies()).get("userToResend")?.value || user?.email;

  if (!email) {
    return { status: "error", message: "no_email" } as FormError;
  }

  try {
    const { data, error } = await mutateAPI({
      query: Mutation,
      variables: { email },
    });

    if (data?.resendActivation) {
      return {
        status: "success",
        message: data.resendActivation,
      } as FormSuccess;
    }

    return {
      status: "error",
      message: error?.message ?? "unknown",
    } as FormError;
  } catch (e) {
    // mutateAPI can reject outright on a network failure or a non-GraphQL 504 body
    return { status: "error", message: (e as Error).message } as FormError;
  }
}
