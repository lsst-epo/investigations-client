import { NextRequest, NextResponse } from "next/server";
import { mutateAPI } from "@/lib/fetch";
import { useFragment } from "@/gql/public-schema";
import { AuthFragmentFragmentDoc } from "gql/public-schema/graphql";
import { cookies } from "next/headers";
import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n/server";
import {
  COOKIE_OPTIONS,
  getAuthCookies,
  setAuthCookies,
} from "@/lib/auth/cookieService";
import { AuthenticateMutation } from "@/lib/auth/authService";

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

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // FormDataEntryValue is a union of string and File, but since we don't use
  // input[type='file'] we can assume this will always be a string
  const { data, error } = await mutateAPI({
    query: AuthenticateMutation,
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

    const { craftToken, craftRefreshToken, craftUserStatus, craftUserId } =
      await getAuthCookies();

    if (craftToken) res.cookies.set("craftToken", craftToken, COOKIE_OPTIONS);
    if (craftRefreshToken)
      res.cookies.set("craftRefreshToken", craftRefreshToken, COOKIE_OPTIONS);
    if (craftUserStatus)
      res.cookies.set("craftUserStatus", craftUserStatus, COOKIE_OPTIONS);
    if (craftUserId)
      res.cookies.set("craftUserId", craftUserId, COOKIE_OPTIONS);

    return res;
  } else if (error) {
    const parsedError = await parseErrors(error, email);
    return NextResponse.json(parsedError, { status: 400 });
  }
  return null;
}
