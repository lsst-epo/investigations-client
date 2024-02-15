import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url || url.length === 0) {
    return NextResponse.json("Missing required LaTeX parameter", {
      status: 400,
    });
  }

  try {
    const response = await fetch(url, {
      next: {
        tags: ["datasets"],
      },
    });
    const asset = await response.json();
    return new NextResponse(JSON.stringify(asset), {
      // Create a new NextResponse for the file with the given stream from the disk
      status: 200, // STATUS 200: HTTP - Ok
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(JSON.stringify(error), { status: 500 });
  }
}
