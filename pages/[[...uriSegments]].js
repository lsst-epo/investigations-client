import PropTypes from "prop-types";
import { getGlobalData } from "@/api/global";
import { getAllEntries, getEntrySectionByUri } from "@/api/entries";
import { getEntryDataByUri } from "@/api/entry";
import { getSiteString } from "@/lib/utils";
import { GlobalDataProvider } from "@/contexts/GlobalData";
import PageTemplate from "@/templates/Page";
import HomePageTemplate from "@/templates/HomePage";
import { internalLinkWithChildrenShape } from "@/shapes/link";
import siteInfoShape from "@/shapes/siteInfo";
import { updateI18n } from "@/lib/i18n";
import InvestigationsTemplate from "@/components/templates/Investigations";

const CRAFT_HOMEPAGE_URI = "__home__";

export default function Page({ section, globalData, ...entryProps }) {
  globalData.localeInfo.locale === "es" ? updateI18n("es") : updateI18n("en");

  const sectionMap = {
    homepage: HomePageTemplate,
    investigations: InvestigationsTemplate,
  };

  const Template = sectionMap[section] || PageTemplate;

  return (
    <GlobalDataProvider data={globalData}>
      <Template {...entryProps} />
    </GlobalDataProvider>
  );
}

async function getEntryData(uri, section, site, previewToken) {
  return await getEntryDataByUri(uri, site, previewToken);
}

export async function getStaticPaths() {
  return {
    paths: await getAllEntries(),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { uriSegments }, previewData }) {
  const site = getSiteString(uriSegments);
  const uri =
    uriSegments && uriSegments.length
      ? uriSegments.join("/")
      : CRAFT_HOMEPAGE_URI;

  const data = await getGlobalData();

  // add _es to property names if site is "es"
  const isEspanol = site === "es";
  const globals = data[`globals${isEspanol ? "_es" : ""}`].reduce(
    (obj, item) =>
      Object.assign(obj, Object.keys(item).length && { [item.handle]: item }),
    {}
  );

  const section = await getEntrySectionByUri(uri, site);

  const entryData = await getEntryData(
    uri,
    section,
    site,
    previewData?.previewToken
  );

  const currentId = entryData?.id || entryData?.entry?.id;

  const globalData = {
    categories: data?.[`allCategories${isEspanol ? "_es" : ""}`] || [],
    headerNavItems: data?.[`pageTree${isEspanol ? "_es" : ""}`] || [],
    siteInfo: globals?.siteInfo || {},
    localeInfo: {
      locale: site,
      language: entryData?.language || entryData?.entry?.language || "",
      localized: entryData?.localized || entryData?.entry?.localized || [],
    },
  };

  // Handle 404 if there is no data
  if (!currentId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: entryData,
      section,
      globalData,
    },
    revalidate: 30,
  };
}

Page.propTypes = {
  data: PropTypes.object,
  section: PropTypes.string,
  globalData: PropTypes.exact({
    categories: PropTypes.array,
    headerNavItems: PropTypes.arrayOf(internalLinkWithChildrenShape),
    localeInfo: PropTypes.object,
    siteInfo: siteInfoShape,
  }),
};
