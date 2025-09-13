import { NextRequest, NextResponse } from "next/server";
import { mutateAPI } from "@/lib/fetch";
import { graphql, useFragment } from "@/gql/public-schema";
import {
  AuthFragmentFragment,
  AuthFragmentFragmentDoc,
  UserFragmentFragmentDoc,
} from "gql/public-schema/graphql";
import { cookies } from "next/headers";
import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n/server";
import {cache} from "react";

const Mutation = graphql(`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      ...AuthFragment
    }
  }
`);

const parseErrors = async (
  { graphQLErrors, networkError }: CombinedError,
  email: string
): Promise<FormState> => {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || fallbackLng;
  const { t } = await serverTranslation(locale, "translation");

  if (networkError) {
    return {
      status: "error",
      message: t("auth.auth_failed", { context: "network" }),
    };
  }

  if (graphQLErrors.length > 0) {
    const { message } = graphQLErrors[0];

    if (message.includes("activate")) {
      (await cookies()).set("userToResend", email, { maxAge: 300 });

      return {
        status: "error",
        message: t("auth.auth_failed", { context: "activate" }),
      };
    }
  }

  return {
    status: "error",
    message: t("auth.auth_failed"),
  };
};

// TODO: Remove after refactoring api/cookie and chaining POST requests
export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: true,
} as const;

// TODO: Remove after refactoring api/cookie and chaining POST requests
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

// TODO: Remove after refactoring api/cookie and chaining POST requests
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
  const userData = useFragment(UserFragmentFragmentDoc, data.user);

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

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const { data, error } = await mutateAPI({
    query: Mutation,
    variables: { email: email as string, password: password as string },
  });

  // not actually a client-side hook, just named like one
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authData = useFragment(AuthFragmentFragmentDoc, data?.authenticate);

  if (authData) {
    await setAuthCookies(authData);

    const res = NextResponse.json({
      status: "success",
      message: "Login successful!",
    });

    const { craftToken, craftRefreshToken, craftUserStatus, craftUserId } = await getAuthCookies();

    if (craftToken) res.cookies.set("craftToken", craftToken, COOKIE_OPTIONS);
    if (craftRefreshToken) res.cookies.set("craftRefreshToken", craftRefreshToken, COOKIE_OPTIONS);
    if (craftUserStatus) res.cookies.set("craftUserStatus", craftUserStatus, COOKIE_OPTIONS);
    if (craftUserId) res.cookies.set("craftUserId", craftUserId, COOKIE_OPTIONS);

    return res;
  } else if (error) {
    const parsedError = await parseErrors(error, email);
    return NextResponse.json(parsedError, { status: 400 });
  }
  return null;
}
