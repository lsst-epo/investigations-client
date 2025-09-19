import { NextRequest, NextResponse } from "next/server";
import { AuthFragmentFragment } from "gql/public-schema/graphql";
import { revalidatePath } from "next/cache";
import revokeRefreshToken from "@/lib/auth/session/revoke";
import {
  COOKIE_OPTIONS,
  authenticate,
  getAuthCookies,
  setAuthCookies,
  deleteAuthCookies,
} from "./cookieService";

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

  if (craftToken) res.cookies.set("craftToken", craftToken, COOKIE_OPTIONS);
  if (craftRefreshToken)
    res.cookies.set("craftRefreshToken", craftRefreshToken, COOKIE_OPTIONS);
  if (craftUserStatus)
    res.cookies.set("craftUserStatus", craftUserStatus, COOKIE_OPTIONS);
  if (craftUserId) res.cookies.set("craftUserId", craftUserId, COOKIE_OPTIONS);

  return res;
}

export async function DELETE(request: Request) {
  const { path } = await request.json();
  try {
    const { craftRefreshToken } = await getAuthCookies();
    if (craftRefreshToken) {
      await revokeRefreshToken(craftRefreshToken);
    }

    await deleteAuthCookies();

    // The mutationClient() and other callers do not require a redirect/revalidate
    if (path) {
      revalidatePath(path);
    }

    return NextResponse.json(
      { message: "Logged out and cookies deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cookie:", error);
  }
}
