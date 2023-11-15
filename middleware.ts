import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { fallbackLng, languages } from "./lib/i18n/settings";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {
    nextUrl: { search, pathname },
  } = request;

  if (pathname === "/sso-redirect") {
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { state: redirectPath, facebook, code } = params;
    if (redirectPath && facebook && code) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = redirectPath;

      return NextResponse.redirect(redirectUrl);
    }
  } else {
    const handleI18nRouting = createIntlMiddleware({
      // A list of all locales that are supported
      locales: languages,
      localePrefix: "as-needed",

      // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
      defaultLocale: fallbackLng,
    });
    const response = handleI18nRouting(request);

    return response;
  }
}

export const config = {
  // do not localize next.js paths
  matcher: [
    "/sso-redirect/",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
