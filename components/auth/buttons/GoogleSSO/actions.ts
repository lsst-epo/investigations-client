"use server";

import { revalidatePath } from "next/cache";
import { OAuth2Client } from "google-auth-library";
import { setAuthCookies } from "@/components/auth/serverHelpers";
import { graphql, useFragment } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;
const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET;

const oAuth2Client = new OAuth2Client(
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  "postmessage"
);

// exchanges Auth Code for Tokens
export async function getTokens(code) {
  const { tokens } = await oAuth2Client.getToken(code);

  return tokens;
}

const StudentMutation = graphql(`
  mutation GoogleSignInStudent($idToken: String!) {
    googleSignInStudents(idToken: $idToken) {
      ...AuthFragment
    }
  }
`);

function conditionallySetCookiesRevalidatePath(authData, pathToRevalidate) {
  if (authData) {
    setAuthCookies(authData);

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate, "page");
    }
    return authData;
  }
}

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
  conditionallySetCookiesRevalidatePath(authData, pathToRevalidate, error);

  if (error) {
    throw new Error(error.message);
  }
}

const EducatorMutation = graphql(`
  mutation GoogleSignInEducator($idToken: String!) {
    googleSignInEducators(idToken: $idToken) {
      ...AuthFragment
    }
  }
`);

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
  conditionallySetCookiesRevalidatePath(authData, pathToRevalidate, error);

  if (error) {
    throw new Error(error.message);
  }
}

export async function authenticateUser(
  group: string,
  idToken: string,
  pathToRevalidate?: string
) {
  // There might be a case where the group is already set, so we check first
  if (group === "educators") {
    await authenticateEducator(idToken, pathToRevalidate);
  } else if (group === "students") {
    await authenticateStudent(idToken, pathToRevalidate);
    // Usually group is not set, so we'll try pulling user data from both students and educators
  } else {
    // First try to pull Student user data
    const { data: studentData, error: studentError } = await mutateAPI({
      query: StudentMutation,
      variables: { idToken },
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const studentAuthData = useFragment(
      AuthFragmentFragmentDoc,
      studentData?.googleSignInEducators
    );
    conditionallySetCookiesRevalidatePath(studentAuthData, pathToRevalidate);
    // Returns if data so we don't hit the educator data fetch if we don't need it
    if (studentAuthData) return studentAuthData;

    // Then try to pull Educator user data
    const { data: eduData, error: eduError } = await mutateAPI({
      query: EducatorMutation,
      variables: { idToken },
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const eduAuthData = useFragment(
      AuthFragmentFragmentDoc,
      eduData?.googleSignInEducators
    );
    conditionallySetCookiesRevalidatePath(eduAuthData, pathToRevalidate);
    if (eduAuthData) return eduAuthData;

    if (eduError || studentError) {
      throw new Error(eduError?.message || studentError?.message);
    }
  }
}
