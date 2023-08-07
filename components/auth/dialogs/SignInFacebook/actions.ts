"use server";

import { revalidatePath } from "next/cache";
import { setAuthCookies } from "@/components/auth/serverHelpers";
import { graphql, useFragment } from "@/gql";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/graphql";

export async function authenticateStudent(
  code: string,
  pathToRevalidate?: string
) {
  const { data, error } = await mutateAPI({
    query: StudentMutation,
    variables: { code },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(
    AuthFragmentFragmentDoc,
    data?.facebookSignInStudents
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
  code: string,
  pathToRevalidate?: string
) {
  const { data, error } = await mutateAPI({
    query: EducatorMutation,
    variables: { code },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(
    AuthFragmentFragmentDoc,
    data?.facebookSignInEducators
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
  mutation FacebookSignInStudent($code: String!) {
    facebookSignInStudents(code: $code) {
      ...AuthFragment
    }
  }
`);

const EducatorMutation = graphql(`
  mutation FacebookSignInEducator($code: String!) {
    facebookSignInEducators(code: $code) {
      ...AuthFragment
    }
  }
`);
