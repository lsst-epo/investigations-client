"use server";

import { revalidatePath } from "next/cache";
import { OAuth2Client } from "google-auth-library";
import { setAuthCookies } from "@/components/auth/serverHelpers";
import { graphql, useFragment } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;
const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET;

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

const userGroups = {
  students: { mutation: StudentMutation, directive: "googleSignInStudents" },
  educators: { mutation: EducatorMutation, directive: "googleSignInEducators" },
};

// Instatiate GoogleOAuth client with our secrets
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

function conditionallySetCookiesRevalidatePath(authData, pathToRevalidate) {
  if (authData) {
    setAuthCookies(authData);

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate, "page");
    }
    return authData;
  }
}

async function authenticate(idToken: string, group: string) {
  const { mutation, directive } = userGroups[group];

  const { data, error } = await mutateAPI({
    query: mutation,
    variables: { idToken },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.[directive]);
  // Returns stuff so potentially do error handling and data validation
  return { authData, error };
}

function conditionallyHandleError(data, error) {
  if (!data && error) {
    throw new Error(error?.message);
  } else if (error) {
    console.warn(error?.message);
  }
}

export async function authenticateUser(
  group: string,
  idToken: string,
  pathToRevalidate?: string
) {
  // If there's a group selected this is a sign up
  if (group) {
    const { authData, error } = await authenticate(
      idToken,
      group,
      pathToRevalidate
    );

    conditionallySetCookiesRevalidatePath(authData);
    conditionallyHandleError(authData, error);
  } else {
    // First try to pull Student user data
    const { authData: studentData, error: studentError } = await authenticate(
      idToken,
      "students",
      pathToRevalidate
    );

    // Then try to pull Educator user data
    const { authData: educatorData, error: educatorError } = await authenticate(
      idToken,
      "educators",
      pathToRevalidate
    );
    // eslint-disable-next-line no-console
    console.log("authenticateUser", studentData || educatorData, studentError || educatorError);
    conditionallySetCookiesRevalidatePath(studentData || educatorData);
    conditionallyHandleError(
      studentData || educatorData,
      studentError || educatorError
    );
  }
}
