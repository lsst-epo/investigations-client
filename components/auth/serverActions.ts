"use server";

/**
 * This server action should probably live in @/components/auth/serverHelpers
 * However, as implemented serverHelpers.ts is not able to be given the "use server" directive
 * without that directive, certain client component usage converts them to client functions
 * but they use the server only `cookies` from "next/headers" which breaks the client component.
 *
 * This exposition is being outlined here because either serverHelpers should be
 * fully converted to true server functions with the directive to protect them against conversion
 * OR the functions that should always be server side should be moved here.
 *
 * Deciding how to handle this and any refactoring was beyond the scope and time limit available
 * when I ran into the issues. A ticket will be made to address this separately.
 * ~ Jeff
 */

import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";

export async function isUserAnEducator() {

  const { craftToken } = await getAuthCookies();
  const user = await getUserFromJwt(craftToken);

  return user?.group === "educators";
}