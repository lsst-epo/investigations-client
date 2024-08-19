import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { RootParams } from "@/app/[locale]/layout";
import { notFound } from "next/navigation";
import ReferenceContentPage from "@/components/templates/ReferenceContentPage";
import { getSite } from "@/helpers";
import { FunctionComponent } from "react";

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
      referenceModalsEntries(site: $site) {
        ... on referenceModals_default_Entry {
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
  return data?.referenceModalsEntries?.map((entry) => {
    return { slug: entry?.slug };
  });
};

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

  if (!entry || entry.__typename !== "referenceModals_default_Entry") {
    notFound();
  }

  return <ReferenceContentPage data={entry} site={site} />;
};

export default ReferencePage;
