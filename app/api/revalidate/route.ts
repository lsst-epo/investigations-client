import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import tags from "@/lib/tags";
import { languages, fallbackLng } from "@/lib/i18n/settings";

const REVALIDATE_SECRET_TOKEN = process.env.CRAFT_SECRET_TOKEN;
const CRAFT_HOMEPAGE_URI = "__home__";

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get("uri");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!uri) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Missing path to revalidate",
    });
  }

  if (secret !== REVALIDATE_SECRET_TOKEN) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Invalid token",
    });
  }

  if (uri) {
    languages.forEach((locale) => {
      const parts: Array<string> = uri === CRAFT_HOMEPAGE_URI ? [] : [uri];
      if (locale !== fallbackLng) {
        parts.unshift(locale);
      }

      revalidatePath(`/${parts.join("/")}`);
    });

    revalidateTag(tags.globals);
    Object.entries(tags).forEach(([, tag]) => {
      revalidateTag(tag);
    });
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Error revalidating",
  });
}
