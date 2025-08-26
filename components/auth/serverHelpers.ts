import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { useFragment } from "@/gql/public-schema";
import type { PendingGroup, Token } from "@/types/auth";
import {
  UserFragmentFragmentDoc,
  type AuthFragmentFragment,
} from "gql/public-schema/graphql";
import { cache } from "react";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: true,
} as const;

export async function setAuthCookies(data: AuthFragmentFragment) {
  const { jwt, refreshToken, refreshTokenExpiresAt } = data;

  // This is the original implementation, except for "as unknown as UnsafeUnwrappedCookies"
  // which was added from the codemod as a bandaid until we make this async
  (cookies() as unknown as UnsafeUnwrappedCookies).set("craftToken", jwt, {
    ...COOKIE_OPTIONS,
    expires: refreshTokenExpiresAt,
  });

  // This was my attempt to handle things async, with the addition of the async
  // keyword in the function definition. I had different variations because I was
  // with different errors (using set() on a ReadOnlyRequestCookie was the main one)
  // but I landed here with a TypeError coming from the `jwt` object.
  //
  // const cookieStore = await cookies();
  // cookieStore.set("craftToken", jwt, {
  //   ...COOKIE_OPTIONS,
  //   expires: refreshTokenExpiresAt,
  // });

  // This was me seeing if the TypeError was the final boss (it's not). I got
  // errors coming from the cookie options and rearranged things this far. It's
  // currently still erroring on httpOnly.
  // https://nextjs.org/docs/app/api-reference/functions/cookies#options
  //
  // if (jwt) {
  //   cookieStore.set({
  //     name: "craftToken",
  //     value: jwt,
  //     httpOnly: true,
  //     path: "/",
  //     sameSite: "lax", // TODO: Chose lax because it's the default, check with Eric
  //     expires: refreshTokenExpiresAt,
  //   });
  // }

  (cookies() as unknown as UnsafeUnwrappedCookies).set(
    "craftRefreshToken",
    refreshToken,
    {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    }
  );

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userData = useFragment(UserFragmentFragmentDoc, data.user);

  if (userData?.status) {
    (cookies() as unknown as UnsafeUnwrappedCookies).set(
      "craftUserStatus",
      userData.status,
      {
        ...COOKIE_OPTIONS,
        expires: refreshTokenExpiresAt,
      }
    );
  }

  if (userData?.id) {
    (cookies() as unknown as UnsafeUnwrappedCookies).set(
      "craftUserId",
      userData.id,
      {
        ...COOKIE_OPTIONS,
        expires: refreshTokenExpiresAt,
      }
    );
  }
}

export const getAuthCookies = cache(() => {
  const craftToken = (cookies() as unknown as UnsafeUnwrappedCookies).get("craftToken")?.value;
  const craftRefreshToken = (cookies() as unknown as UnsafeUnwrappedCookies).get("craftRefreshToken")?.value;
  const craftUserStatus = (cookies() as unknown as UnsafeUnwrappedCookies).get("craftUserStatus")?.value;
  const craftUserId = (cookies() as unknown as UnsafeUnwrappedCookies).get("craftUserId")?.value;

  return {
    craftToken,
    craftRefreshToken,
    craftUserStatus,
    craftUserId,
  };
});

export function deleteAuthCookies() {
  (cookies() as unknown as UnsafeUnwrappedCookies).delete("craftToken");
  (cookies() as unknown as UnsafeUnwrappedCookies).delete("craftRefreshToken");
  (cookies() as unknown as UnsafeUnwrappedCookies).delete("craftUserStatus");
  (cookies() as unknown as UnsafeUnwrappedCookies).delete("craftUserId");
}

export function getUserFromJwt(jwt?: Token) {
  if (!jwt) return undefined;

  const { email, groups, fullName } = jwtDecode<{
    email: string;
    groups: PendingGroup[];
    fullName: string;
  }>(jwt);
  const group = groups?.length ? groups[0].toLowerCase() : null;
  return {
    email,
    fullName,
    group: group as PendingGroup | null,
  };
}
