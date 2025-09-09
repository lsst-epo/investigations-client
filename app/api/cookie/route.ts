import { NextRequest, NextResponse } from "next/server";
import { mutateAPI } from "@/lib/fetch";
import { graphql, useFragment } from "@/gql/public-schema";
import { AuthFragmentFragment, AuthFragmentFragmentDoc } from "gql/public-schema/graphql";
import {
  getAuthCookies,
  setAuthCookies,
  deleteAuthCookies,
} from "@/components/auth/serverHelpers";
import { revalidatePath } from "next/cache";
import revokeRefreshToken from "@/lib/auth/session/revoke";

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.[directive]);
  // Returns stuff so potentially do error handling and data validation

  return { authData, error };
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

export async function POST(request: NextRequest) {
  const { token, group, path } = await request.json();

  if (!token || !path) {
    return NextResponse.json(
      { error: "Missing information needed to sign in" },
      { status: 400 }
    );
  }

  // If there's a group selected this is a sign up
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
  const res = new NextResponse();
  const { craftToken, craftRefreshToken, craftUserStatus, craftUserId } =
    await getAuthCookies();

  if (craftToken) res.cookies.set("craftToken", craftToken);
  if (craftRefreshToken)
    res.cookies.set("craftRefreshToken", craftRefreshToken);
  if (craftUserStatus) res.cookies.set("craftUserStatus", craftUserStatus);
  if (craftUserId) res.cookies.set("craftUserId", craftUserId);

  return res;
}

export async function GET(request: Request) {
  try {
    const cookies = await getAuthCookies();
    return NextResponse.json({
      message: "Cookies retrieved successfully",
      authCookies: cookies,
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving cookies:", error);
  }
}

export async function DELETE(request: Request) {
  const { path } = await request.json();
  try {
    const { craftRefreshToken } = await getAuthCookies();
    if (craftRefreshToken) {
      await revokeRefreshToken(craftRefreshToken);
    }

    await deleteAuthCookies();
    console.info("in DELETE, revalidating path: ", path);
    revalidatePath(path);

    return NextResponse.json(
      { message: "Logged out and cookies deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
}