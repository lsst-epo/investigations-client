import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { notFound } from "next/navigation";
import ReferenceContentPage from "@/components/templates/ReferenceContentPage";
import { ReferencePageProps } from "../../../reference/[slug]/page";
import { fallbackLng } from "@/lib/i18n/settings";
import { getSite } from "@/helpers";

const Query = graphql(`
  query ReferenceContent($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ...ReferenceContentTemplate
    }
  }
`);

const ReferenceModal: (
  props: ReferencePageProps
) => Promise<JSX.Element> = async ({ params }) => {
  const { slug, locale = fallbackLng } = params;
  const uri = `reference/${slug}`;
  const site = getSite(locale);

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
  return <ReferenceContentPage data={entry} site={site} isInModal={true} />;
};

export default ReferenceModal;
