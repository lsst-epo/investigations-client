import { graphql, useFragment as getFragment } from "@/gql/public-schema";
import { mutateAPI } from "@/lib/fetch";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";
import { setAuthCookies } from "../cookie/cookieService";
import { revalidatePath } from "next/cache";

export const AuthenticateMutation = graphql(`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      ...AuthFragment
    }
  }
`);

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

async function authenticate(idToken: string, group: string) {
  const { mutation, directive } = userGroups[group];

  const { data, error } = await mutateAPI({
    query: mutation,
    variables: { idToken },
  });

  const authData = await getFragment(
    AuthFragmentFragmentDoc,
    data?.[directive]
  );
  // Returns stuff so potentially do error handling and data validation

  return { authData, error };
}

export async function checkCredentials(
  group: string,
  token: string,
  path: string
) {
  if (group) {
    const { authData, error } = await authenticate(token, group);

    conditionallySetCookiesRevalidatePath(authData, path);
    conditionallyHandleError(authData, error);
  } else {
    // First try to pull Student user data
    const { authData: studentData, error: studentError } = await authenticate(
      token,
      "students"
    );

    // Then try to pull Educator user data
    const { authData: educatorData, error: educatorError } = await authenticate(
      token,
      "educators"
    );

    conditionallySetCookiesRevalidatePath(studentData || educatorData, path);
    conditionallyHandleError(
      studentData || educatorData,
      studentError || educatorError
    );
  }
}

async function conditionallySetCookiesRevalidatePath(
  authData: AuthFragmentFragment,
  pathToRevalidate: string
) {
  if (authData) {
    setAuthCookies(authData);

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate, "page");
    }

    return authData;
  }
}

function conditionallyHandleError(data: AuthFragmentFragment, error: any) {
  if (!data && error) {
    throw new Error(error?.message);
  } else if (error) {
    console.warn(error?.message);
  }
}
