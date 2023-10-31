import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { InvestigationParams } from "../../layout";
import { RootLayoutParams } from "@/app/[locale]/layout";
import { notFound } from "next/navigation";
import ReferenceContentPage from "@/components/templates/ReferenceContentPage";

interface ReferencePageParams {
  slug: string;
}

interface ReferencePageProps {
  params: RootLayoutParams & InvestigationParams & ReferencePageParams;
}

const Query = graphql(`
  query ReferenceContent($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ...ReferenceContentTemplate
    }
  }
`);

const ReferencePage: (
  props: ReferencePageProps
) => Promise<JSX.Element> = async ({ params }) => {
  const { slug, locale = fallbackLng } = params;
  const uri = `reference/${slug}`;
  const site = locale === "en" ? "default" : locale;

  console.log({ uri, site });

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
  });

  const { entry } = data || {};

  if (!entry || entry.__typename !== "referenceModals_default_Entry") {
    notFound();
  }

  return <ReferenceContentPage data={entry} site={site} />;
};

export default ReferencePage;
