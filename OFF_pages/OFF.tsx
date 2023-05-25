import { FunctionComponent } from "react";
import { getGlobalData } from "@/api/global";
import { getAllEntries, getEntrySectionByUri } from "@/api/entries";
import { getEntryDataByUri } from "@/api/entry";
import { GlobalData, GlobalDataProvider } from "@/contexts/GlobalData";
import PageTemplate from "@/templates/Page";
import HomePageTemplate from "@/templates/HomePage";
import { useRouter } from "next/router";

const CRAFT_HOMEPAGE_URI = "__home__";

interface PageProps {
  data: any;
  section: string;
  globalData: GlobalData;
}

const Page: FunctionComponent<PageProps> = ({
  section,
  globalData,
  ...entryProps
}) => {
  const { locale = "en" } = useRouter();

  const sectionMap: { [key: string]: any } = {
    homepage: HomePageTemplate,
  };

  const Template = sectionMap[section] || PageTemplate;

  return (
    <GlobalDataProvider data={globalData}>
      <Template {...entryProps} />
    </GlobalDataProvider>
  );
};

async function getEntryData(
  uri: any,
  section: any,
  site: string,
  previewToken: any
) {
  return await getEntryDataByUri(uri, site, previewToken);
}

export async function getStaticPaths() {
  return {
    paths: await getAllEntries(),
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { uriSegments },
  locale,
  previewData,
}: {
  params: { uriSegments: string | string[] };
  locale: string;
  previewData: any;
}) {
  const site = locale === "en" ? "default" : locale;
  // add _es to property names if site is not English
  const nonEng = site !== "default";
  const uri: string =
    uriSegments && Array.isArray(uriSegments)
      ? uriSegments.join("/")
      : CRAFT_HOMEPAGE_URI;

  const data = await getGlobalData();

  const globals = data[`globals${nonEng ? `_${locale}` : ""}`].reduce(
    (obj: any, item: any) =>
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
    categories: data?.[`allCategories${nonEng ? `_${locale}` : ""}`] || [],
    headerNavItems: data?.[`pageTree${nonEng ? `_${locale}` : ""}`] || [],
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

Page.displayName = "Entry.Page";

export default Page;
