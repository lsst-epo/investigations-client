"use server";

import { redirect } from "next/navigation";
import {
  // deleteAuthCookies,
  getAuthCookies,
} from "@/components/auth/serverHelpers";
import revokeRefreshToken from "@/lib/auth/session/revoke";
import { cookies } from "next/headers";

async function signOut(redirectTo: string) {
  const { craftRefreshToken } = getAuthCookies();

  if (craftRefreshToken) {
    await revokeRefreshToken(craftRefreshToken);
  }
  (await cookies()).delete("craftToken");
  (await cookies()).delete("craftRefreshToken");
  (await cookies()).delete("craftUserStatus");
  (await cookies()).delete("craftUserId");
  redirect(redirectTo);
}

export default signOut;
