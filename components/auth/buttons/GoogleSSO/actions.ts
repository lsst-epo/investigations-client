"use server";

import { revalidatePath } from "next/cache";
import { setAuthCookies } from "@/components/auth/serverHelpers";
import { graphql, useFragment } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";

export async function authenticateStudent(
  idToken: string,
  pathToRevalidate?: string
) {
  const { data, error } = await mutateAPI({
    query: StudentMutation,
    variables: { idToken },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(
    AuthFragmentFragmentDoc,
    data?.googleSignInStudents
  );

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

export async function authenticateEducator(
  idToken: string,
  pathToRevalidate?: string
) {
  const { data, error } = await mutateAPI({
    query: EducatorMutation,
    variables: { idToken },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(
    AuthFragmentFragmentDoc,
    data?.googleSignInEducators
  );

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

const StudentMutation = graphql(`
  mutation GoogleSignInStudent($idToken: String!) {
    googleSignInStudents(idToken: $idToken) {
      ...AuthFragment
    }
  }
`);

const EducatorMutation = graphql(`
  mutation GoogleSignInEducator($idToken: String!) {
    googleSignInEducators(idToken: $idToken) {
      ...AuthFragment
    }
  }
`);
