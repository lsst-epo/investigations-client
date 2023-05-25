import { notFound } from "next/navigation";
import PageTemplate from "@/templates/Page";
import { UriSegmentsProps } from "./layout";
import { getEntrySectionByUri } from "@/api/entries";
import { getEntryDataByUri } from "@/api/entry";
import { Metadata } from "next";

async function getEntryData(uri: string, site: string, previewToken: any) {
  return await getEntryDataByUri(uri, site, previewToken);
}

export const revalidate = 60;

export async function generateMetadata({
  params: { locale, uriSegments },
}: UriSegmentsProps): Promise<Metadata> {
  const site = locale === "en" ? "default" : locale;
  // add _es to property names if site is not English
  const uri: string = uriSegments.join("/");

  const entryData = await getEntryData(uri, site, null);

  const { title = null } = entryData || {};

  return { title, twitter: { title } };
}

const UriSegments: (props: UriSegmentsProps) => Promise<JSX.Element> = async ({
  params: { locale, uriSegments },
  previewData,
}) => {
  const site = locale === "en" ? "default" : locale;
  // add _es to property names if site is not English
  const uri: string = uriSegments.join("/");

  const section = await getEntrySectionByUri(uri, site);

  const entryData = await getEntryData(uri, site, previewData?.previewToken);

  const currentId = entryData?.id || entryData?.entry?.id;

  if (!currentId) {
    notFound();
  }

  const sectionMap: { [key: string]: any } = {};

  const Template = sectionMap[section] || PageTemplate;

  return <Template data={entryData} />;
};

export default UriSegments;
