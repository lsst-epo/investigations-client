"use server";

import { revalidatePath } from "next/cache";
import { setAuthCookies } from "@/components/auth/serverHelpers";
import { graphql, useFragment } from "@/gql";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/graphql";

export async function signIn(formData: FormData, pathToRevalidate?: string) {
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

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return data;
  } else if (error) {
    throw new Error(error.message);
  }
}

const Mutation = graphql(`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      ...AuthFragment
    }
  }
`);
