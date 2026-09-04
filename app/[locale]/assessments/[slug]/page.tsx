import { FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n/server";
import { RootParams } from "@/app/[locale]/layout";
import AssessmentContentPage from "@/components/templates/AssessmentContentPage";
import { getSite } from "@/helpers";

interface AssessmentPageParams {
  slug: string;
}

export interface AssessmentPageProps {
  params: Promise<RootParams & AssessmentPageParams>;
}

const AssessmentsDataQuery = graphql(`
  query AssessmentContent($site: [String], $slug: [String]) {
    entry(site: $site, slug: $slug) {
      ...AssessmentContentTemplate
    }
  }
`);

export const generateStaticParams = async ({
  params: { locale },
}: AssessmentPageProps) => {
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

  const { data } = await queryAPI({
    query: AssessmentsDataQuery,
    variables: {
      site: [site],
      slug: [slug],
    },
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
  const { slug, locale = fallbackLng } = params;
  const site = getSite(locale);

  const { data } = await queryAPI({
    query: AssessmentsDataQuery,
    variables: {
      site: [site],
      slug: [slug],
    },
  });

  const { entry } = data || {};

  if (!entry || entry.__typename !== "assessments_default_Entry") {
    notFound();
  }

  return <AssessmentContentPage data={entry} site={site} locale={locale} />;
};

export default AssessmentPage;
