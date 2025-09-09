"use server";

import { redirect } from "next/navigation";
import {
  // deleteAuthCookies,
  getAuthCookies,
} from "@/components/auth/serverHelpers";
import revokeRefreshToken from "@/lib/auth/session/revoke";
import { cookies } from "next/headers";

const deleteAuthCookies = async () => {
  console.info("in deleteAuthCookies");

  (await cookies()).delete("craftToken");
  (await cookies()).delete("craftRefreshToken");
  (await cookies()).delete("craftUserStatus");
  (await cookies()).delete("craftUserId");
};

async function signOut(redirectTo: string) {
  console.info("in signOut action");
  const { craftRefreshToken } = await getAuthCookies();

  if (craftRefreshToken) {
    await revokeRefreshToken(craftRefreshToken);
  }

  await deleteAuthCookies();

  redirect(redirectTo);
}

export default signOut;
