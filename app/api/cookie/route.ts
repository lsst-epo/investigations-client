import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import revokeRefreshToken from "@/lib/auth/session/revoke";
import {
  COOKIE_OPTIONS,
  getAuthCookies,
  deleteAuthCookies
} from "@/lib/auth/cookieService";
import { checkCredentials } from "@/lib/auth/authService";

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

  await checkCredentials(group, token, path);

  const res = new NextResponse();
  const { craftToken, craftRefreshToken, craftUserStatus, craftUserId } =
    await getAuthCookies();

  if (craftToken)
    res.cookies.set("craftToken", craftToken, COOKIE_OPTIONS);
  if (craftRefreshToken)
    res.cookies.set("craftRefreshToken", craftRefreshToken, COOKIE_OPTIONS);
  if (craftUserStatus)
    res.cookies.set("craftUserStatus", craftUserStatus, COOKIE_OPTIONS);
  if (craftUserId)
    res.cookies.set("craftUserId", craftUserId, COOKIE_OPTIONS);

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
