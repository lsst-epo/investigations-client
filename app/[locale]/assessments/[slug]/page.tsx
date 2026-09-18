import { FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphql } from "@/gql/educator-schema";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n/server";
import { RootParams } from "@/app/[locale]/layout";
import AssessmentContentPage from "@/components/educator-schema/AssessmentContentPage";
import { getSite } from "@/helpers";
import { draftMode } from "next/headers";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import Header from "@/components/assessments/Header";

export interface AssessmentPageParams {
  slug: string;
}

export interface AssessmentPageProps {
  params: Promise<RootParams & AssessmentPageParams>;
  searchParams: Promise<Record<string, string | Array<string> | undefined>>;
}

const AssessmentsDataQuery = graphql(`
  query AssessmentContent($site: [String], $slug: [String]) {
    entry(site: $site, slug: $slug) {
      __typename
      title
      ... on assessments_default_Entry {
        investigationEntry {
          ... on investigations_investigationParent_Entry {
            __typename
            uri
            title
          }
        }
      }
      ...AssessmentContentTemplate
    }
  }
`);

const SECRET_TOKEN = process.env.CRAFT_EDUCATOR_SCHEMA_SECRET_TOKEN;

export const generateStaticParams = async ({ params }: AssessmentPageProps) => {
  const { locale } = await params;
  const site = getSite(locale);

  const AssessmentsParamQuery = graphql(`
    query AssessmentParams($site: [String]) {
      referenceContentEntries(site: $site) {
        ... on referenceContent_default_Entry {
          slug
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query: AssessmentsParamQuery,
    variables: {
      site: [site],
    },
  });
  return data?.referenceContentEntries?.map((entry) => {
    return { slug: entry?.slug };
  });
};

export async function generateMetadata(
  props: AssessmentPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const { slug, locale = fallbackLng } = params;
  const { t } = await serverTranslation(locale, "translation");
  const site = getSite(locale);
  const { craftToken } = await getAuthCookies();

  const { data } = await queryAPI({
    query: AssessmentsDataQuery,
    variables: {
      site: [site],
      slug: [slug],
    },
    token: craftToken,
  });

  const { entry } = data || {};

  return {
    title: t("titles.assessment", { title: entry?.title }),
  };
}

const AssessmentPage: FunctionComponent<AssessmentPageProps> = async (
  props,
) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { slug, locale = fallbackLng } = params;

  const site = getSite(locale);

  const { preview: previewToken } = searchParams;
  const { isEnabled: isPreview } = await draftMode();

  const { craftToken, craftUserStatus } = await getAuthCookies();
  const user = await getUserFromJwt(craftToken);

  const { data } = await queryAPI({
    query: AssessmentsDataQuery,
    variables: {
      site: [site],
      slug: [slug],
    },
    token: craftToken,
    authToken: SECRET_TOKEN,
    previewToken: isPreview ? (previewToken as string) : undefined,
  });

  const { entry } = data || {};

  if (!entry || entry.__typename !== "assessments_default_Entry") {
    notFound();
  }

  const investigationEntry =
    entry?.investigationEntry?.[0]?.__typename ===
    "investigations_investigationParent_Entry"
      ? entry.investigationEntry[0]
      : null;

  return (
    <>
      <Header {...{ user, investigationEntry }} />
      <AssessmentContentPage
        data={entry}
        site={site}
        locale={locale}
        status={craftUserStatus}
      />
    </>
  );
};

export default AssessmentPage;
