import { cookies } from "next/headers";
import { cache } from "react";
import { useFragment as getFragment } from "@/gql/public-schema";
import {
  UserFragmentFragmentDoc,
  AuthFragmentFragment,
} from "gql/public-schema/graphql";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: true,
} as const;

export const getAuthCookies = cache(async () => {
  const craftToken = (await cookies()).get("craftToken")?.value;
  const craftRefreshToken = (await cookies()).get("craftRefreshToken")?.value;
  const craftUserStatus = (await cookies()).get("craftUserStatus")?.value;
  const craftUserId = (await cookies()).get("craftUserId")?.value;

  return {
    craftToken,
    craftRefreshToken,
    craftUserStatus,
    craftUserId,
  };
});

export async function setAuthCookies(data: AuthFragmentFragment) {
  const { jwt, refreshToken, refreshTokenExpiresAt } = data;

  (await cookies()).set("craftToken", jwt, {
    ...COOKIE_OPTIONS,
    expires: refreshTokenExpiresAt,
  });

  (await cookies()).set("craftRefreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    expires: refreshTokenExpiresAt,
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userData = getFragment(UserFragmentFragmentDoc, data.user);

  if (userData?.status) {
    (await cookies()).set("craftUserStatus", userData.status, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });
  }

  if (userData?.id) {
    (await cookies()).set("craftUserId", userData.id, {
      ...COOKIE_OPTIONS,
      expires: refreshTokenExpiresAt,
    });
  }
}

export const deleteAuthCookies = async () => {
  (await cookies()).delete("craftToken");
  (await cookies()).delete("craftRefreshToken");
  (await cookies()).delete("craftUserStatus");
  (await cookies()).delete("craftUserId");
};
