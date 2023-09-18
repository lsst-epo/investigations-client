import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import { graphql, useFragment } from "@/gql/public-schema";
import type { PendingGroup, Token } from "@/types/auth";
import {
  UserFragmentFragmentDoc,
  type AuthFragmentFragment,
  AuthFragmentFragmentDoc,
} from "gql/public-schema/graphql";
import { mutateAPI } from "@/lib/fetch";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: true,
} as const;

export async function getAuthCookies() {
  let craftToken = cookies().get("craftToken")?.value;
  let craftRefreshToken = cookies().get("craftRefreshToken")?.value;
  let craftUserStatus = cookies().get("craftUserStatus")?.value;
  let craftUserId = cookies().get("craftUserId")?.value;

  // refresh token if expired
  if (!craftToken && craftRefreshToken) {
    try {
      const refreshedData = await refreshToken(craftRefreshToken);

      if (refreshedData) {
        craftToken = refreshedData.craftToken;
        craftRefreshToken = refreshedData.craftRefreshToken;
        craftUserStatus = refreshedData.craftUserStatus;
        craftUserId = refreshedData.craftUserId;
      }
    } catch (error) {
      craftToken = undefined;
      craftRefreshToken = undefined;
      craftUserStatus = undefined;
      craftUserId = undefined;
    }
  }

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

async function refreshToken(craftRefreshToken: Token) {
  const { data, error } = await mutateAPI({
    query: RefreshMutation,
    variables: {
      refreshToken: craftRefreshToken,
    },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.refreshToken);

  if (authData) {
    setAuthCookies(authData);

    const { jwt, refreshToken, user } = authData;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userData = useFragment(UserFragmentFragmentDoc, user);

    return {
      craftToken: jwt,
      craftRefreshToken: refreshToken,
      craftUserStatus: userData?.status ?? undefined,
      craftUserId: userData?.id ?? undefined,
    };
  } else if (error) {
    throw new Error(error.message);
  }
}

const RefreshMutation = graphql(`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ...AuthFragment
    }
  }
`);
