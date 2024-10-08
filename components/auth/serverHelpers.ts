import { cookies } from "next/headers";
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

export function setAuthCookies(data: AuthFragmentFragment) {
  const { jwt, refreshToken, refreshTokenExpiresAt } = data;

  cookies().set("craftToken", jwt, {
    ...COOKIE_OPTIONS,
    expires: refreshTokenExpiresAt,
  });
  cookies().set("craftRefreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    expires: refreshTokenExpiresAt,
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userData = useFragment(UserFragmentFragmentDoc, data.user);

  if (userData?.status) {
    cookies().set("craftUserStatus", userData.status, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });
  }

  if (userData?.id) {
    cookies().set("craftUserId", userData.id, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });
  }
}

export const getAuthCookies = cache(() => {
  const craftToken = cookies().get("craftToken")?.value;
  const craftRefreshToken = cookies().get("craftRefreshToken")?.value;
  const craftUserStatus = cookies().get("craftUserStatus")?.value;
  const craftUserId = cookies().get("craftUserId")?.value;

  return {
    craftToken,
    craftRefreshToken,
    craftUserStatus,
    craftUserId,
  };
});

export function deleteAuthCookies() {
  cookies().delete("craftToken");
  cookies().delete("craftRefreshToken");
  cookies().delete("craftUserStatus");
  cookies().delete("craftUserId");
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
