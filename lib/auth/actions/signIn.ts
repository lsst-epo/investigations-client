"use server";

import { setAuthCookies } from "@/components/auth/serverHelpers";
import { graphql, useFragment } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";
import { CombinedError } from "@urql/core";
import { cookies } from "next/headers";
import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n/server";
import { redirect } from "next/navigation";

const Mutation = graphql(`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      ...AuthFragment
    }
  }
`);

const parseErrors = async (
  { graphQLErrors, networkError }: CombinedError,
  email: string
): Promise<FormState> => {
  const locale = cookies().get("NEXT_LOCALE")?.value || fallbackLng;
  const { t } = await serverTranslation(locale, "translation");

  if (networkError) {
    return {
      status: "error",
      message: t("auth.auth_failed", { context: "network" }),
    };
  }

  if (graphQLErrors.length > 0) {
    const { message } = graphQLErrors[0];

    if (message.includes("activate")) {
      cookies().set("userToResend", email, { maxAge: 300 });

      return {
        status: "error",
        message: t("auth.auth_failed", { context: "activate" }),
      };
    }
  }

  return {
    status: "error",
    message: t("auth.auth_failed"),
  };
};

export default async function signIn(
  state: FormState,
  formData: FormData,
  returnTo?: string
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData);
  const { email, password } = formDataObj;

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: { email: email as string, password: password as string },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.authenticate);

  if (authData) {
    setAuthCookies(authData);

    if (returnTo) {
      redirect(returnTo);
    } else {
      return { status: "success" };
    }
  } else if (error) {
    return await parseErrors(error, email);
  }
  return null;
}
