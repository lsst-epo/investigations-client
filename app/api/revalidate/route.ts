import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import tags from "@/lib/tags";

const REVALIDATE_SECRET_TOKEN = process.env.CRAFT_SECRET_TOKEN;

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
    revalidatePath(`/[locale]/${uri}`, "page");
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
