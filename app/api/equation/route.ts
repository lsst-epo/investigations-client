import { NextRequest, NextResponse } from "next/server";
import temml from "temml";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const latex = searchParams.get("latex");

  if (!latex || latex.length === 0) {
    return NextResponse.json("Missing required LaTeX parameter", {
      status: 400,
    });
  }

  try {
    const result = temml.renderToString(latex, {
      displayMode: true,
      throwOnError: true,
    });
    return new NextResponse(JSON.stringify(result), {
      // Create a new NextResponse for the file with the given stream from the disk
      status: 200, // STATUS 200: HTTP - Ok
    });
  } catch (error) {
    return NextResponse.json(JSON.stringify(error), { status: 500 });
  }
}
