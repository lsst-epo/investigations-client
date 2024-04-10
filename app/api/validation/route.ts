import { graphql } from "@/gql/public-schema";
import { getSite } from "@/helpers";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { NextRequest, NextResponse } from "next/server";

const Query = graphql(`
  query QuestionValidator($site: [String], $id: [QueryArgument]) {
    entry(site: $site, id: $id) {
      ... on questions_default_Entry {
        validation {
          ... on validation_numberValidator_BlockType {
            comparison
            operator
            message
          }
        }
      }
    }
  }
`);

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const value = request.nextUrl.searchParams.get("value");
  const locale = request.nextUrl.searchParams.get("locale") || fallbackLng;

  if (!id || !value) {
    return NextResponse.json("Missing required parameters", {
      status: 400,
    });
  }

  const site = getSite(locale);

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      id: [id],
    },
  });

  if (!data) {
    return NextResponse.json("Validation not found", {
      status: 400,
    });
  }

  const { entry } = data;

  const { validation } = entry;

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: "Error revalidating",
  });
}
