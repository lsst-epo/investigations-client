import { FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { serverTranslation } from "@/lib/i18n/server";
import { RootParams } from "@/app/[locale]/layout";
import ReferenceContentPage from "@/components/templates/ReferenceContentPage";
import { getSite } from "@/helpers";

interface ReferencePageParams {
  slug: string;
}

export interface ReferencePageProps {
  params: RootParams & ReferencePageParams;
}

const ReferencesDataQuery = graphql(`
  query ReferenceContent($site: [String], $slug: [String]) {
    entry(site: $site, slug: $slug) {
      ...ReferenceContentTemplate
    }
  }
`);

export const generateStaticParams = async ({
  params: { locale },
}: ReferencePageProps) => {
  const site = getSite(locale);

  const ReferencesParamQuery = graphql(`
    query ReferenceParams($site: [String]) {
      referenceContentEntries(site: $site) {
        ... on referenceContent_default_Entry {
          slug
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query: ReferencesParamQuery,
    variables: {
      site: [site],
    },
  });
  return data?.referenceContentEntries?.map((entry) => {
    return { slug: entry?.slug };
  });
};

export async function generateMetadata({
  params,
}: ReferencePageProps): Promise<Metadata> {
  const { slug, locale = fallbackLng } = params;
  const { t } = await serverTranslation(locale, "translation");
  const site = getSite(locale);

  const { data } = await queryAPI({
    query: ReferencesDataQuery,
    variables: {
      site: [site],
      slug: [slug],
    },
  });

  const { entry } = data || {};

  return {
    title: t("titles.reference", { title: entry?.title }),
  };
}

const ReferencePage: FunctionComponent<ReferencePageProps> = async ({
  params,
}) => {
  const { slug, locale = fallbackLng } = params;
  const site = getSite(locale);

  const { data } = await queryAPI({
    query: ReferencesDataQuery,
    variables: {
      site: [site],
      slug: [slug],
    },
  });

  const { entry } = data || {};

  if (!entry || entry.__typename !== "referenceContent_default_Entry") {
    notFound();
  }

  return <ReferenceContentPage data={entry} site={site} />;
};

export default ReferencePage;
