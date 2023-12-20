"use server";
import { cookies } from "next/headers";
import { graphql, useFragment } from "@/gql/public-schema";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";
import { CombinedError } from "@urql/core";
import { mutateAPI } from "@/lib/fetch";
import { serverTranslation } from "@/lib/i18n";
import { setAuthCookies } from "@/components/auth/serverHelpers";
import { fallbackLng } from "@/lib/i18n/settings";

async function getErrorMessage(error: CombinedError): Promise<string> {
  const { value: locale = fallbackLng } = cookies().get("NEXT_LOCALE") || {
    value: fallbackLng,
  };
  const { t } = await serverTranslation(locale, "translation");
  const message = error.message.toLowerCase();
  const results = {
    username_taken: t("register.error_username_taken"),
    email_invalid: t("register.error_email_invalid"),
    password_invalid: t("register.error_password_invalid"),
    default: t("register.error_message"),
  };

  if (message.includes("username") && message.includes("taken")) {
    return results.username_taken;
  }

  if (message.includes("email") && message.includes("valid")) {
    return results.email_invalid;
  }

  if (message.includes("password")) {
    return results.password_invalid;
  }

  return results.default;
}

function getVariables(formData: FormData) {
  const formDataObj = Object.fromEntries(formData);
  const { email, firstName, lastName, password } = formDataObj;

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const fullName =
    firstName && lastName
      ? `${firstName as string} ${lastName as string}`
      : null;

  return {
    email: email as string,
    password: password as string,
    fullName,
  };
}

const EducatorMutation = graphql(`
  mutation RegisterEducator(
    $email: String!
    $password: String!
    $fullName: String
  ) {
    registerEducators(email: $email, password: $password, fullName: $fullName) {
      ...AuthFragment
    }
  }
`);

export async function registerEducator(formData: FormData) {
  const variables = getVariables(formData);

  const { data, error } = await mutateAPI({
    query: EducatorMutation,
    variables,
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(
    AuthFragmentFragmentDoc,
    data?.registerEducators
  );

  if (authData) {
    setAuthCookies(authData);
    return data;
  } else if (error) {
    const message = await getErrorMessage(error);
    throw new Error(message);
  }
}

const StudentMutation = graphql(`
  mutation RegisterStudent(
    $email: String!
    $password: String!
    $fullName: String
  ) {
    registerStudents(email: $email, password: $password, fullName: $fullName) {
      ...AuthFragment
    }
  }
`);

export async function registerStudent(formData: FormData) {
  const variables = getVariables(formData);

  const { data, error } = await mutateAPI({
    query: StudentMutation,
    variables,
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.registerStudents);

  if (authData) {
    setAuthCookies(authData);
    return data;
  } else if (error) {
    const message = await getErrorMessage(error);
    throw new Error(message);
  }
}
