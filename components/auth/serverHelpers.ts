import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import { useFragment } from "@/gql";
import type { Token } from "@/types/auth";
import {
  UserFragmentFragmentDoc,
  type AuthFragmentFragment,
} from "gql/graphql";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: true,
} as const;

export function getAuthCookies() {
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
}

export function setAuthCookies(data: AuthFragmentFragment) {
  const { jwt, jwtExpiresAt, refreshToken, refreshTokenExpiresAt } = data;

  cookies().set("craftToken", jwt, {
    ...COOKIE_OPTIONS,
    expires: jwtExpiresAt,
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
      expires: jwtExpiresAt,
    });
  }

  if (userData?.id) {
    cookies().set("craftUserId", userData.id, {
      ...COOKIE_OPTIONS,
      expires: jwtExpiresAt,
    });
  }
}

export function deleteAuthCookies() {
  cookies().set("craftToken", "", COOKIE_OPTIONS);
  cookies().set("craftRefreshToken", "", COOKIE_OPTIONS);
  cookies().set("craftUserStatus", "", COOKIE_OPTIONS);
  cookies().set("craftUserId", "", COOKIE_OPTIONS);
}

export function getUserFromJwt(jwt?: Token) {
  if (!jwt) return undefined;

  const { email, groups, fullName } = jwtDecode<{
    email: string;
    groups: string[];
    fullName: string;
  }>(jwt);
  const group = groups?.length ? groups[0].toLowerCase() : null;
  return {
    email,
    fullName,
    group,
  };
}
