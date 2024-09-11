"use server";

import { redirect } from "next/navigation";
import {
  deleteAuthCookies,
  getAuthCookies,
} from "@/components/auth/serverHelpers";
import revokeRefreshToken from "@/lib/auth/session/revoke";

async function signOut(redirectTo: string) {
  const { craftRefreshToken } = getAuthCookies();

  if (craftRefreshToken) {
    await revokeRefreshToken(craftRefreshToken);
  }
  deleteAuthCookies();
  redirect(redirectTo);
}

export default signOut;
