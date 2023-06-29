import { notFound } from "next/navigation";
import { createClient, fetchExchange } from "@urql/core";
import { graphql } from "@/gql";
import TemplateFactory from "@/components/factories/TemplateFactory";
import { UriSegmentsProps } from "./layout";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params: { locale, uriSegments },
}: UriSegmentsProps): Promise<Metadata> {
  const site = locale === "en" ? "default" : locale;
  // add _es to property names if site is not English
  const uri: string = uriSegments.join("/");

  const client = createClient({
    url: process.env.NEXT_PUBLIC_API_URL as string,
    exchanges: [fetchExchange],
  });

  const data = await client
    .query(MetadataQuery, {
      site: [site],
      uri: [uri],
    })
    .toPromise()
    .then((result) => {
      return result.data;
    });

  const title = data?.entry?.title;

  return title ? { title, twitter: { title } } : {};
}

const UriSegments: (props: UriSegmentsProps) => Promise<JSX.Element> = async ({
  params: { locale, uriSegments },
  // previewData,
}) => {
  const site = locale === "en" ? "default" : locale;
  // add _es to property names if site is not English
  const uri: string = uriSegments.join("/");

  const client = createClient({
    url: process.env.NEXT_PUBLIC_API_URL as string,
    exchanges: [fetchExchange],
  });

  const data = await client
    .query(Query, {
      site: [site],
      uri: [uri],
    })
    .toPromise()
    .then((result) => {
      return result.data;
    });

  return data?.entry ? <TemplateFactory data={data.entry} /> : notFound();
};

export default UriSegments;

const MetadataQuery = graphql(`
  query UriSegmentsMetadata($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      title
    }
  }
`);

const Query = graphql(`
  query UriSegmentsQuery($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ...TemplateFactory
    }
  }
`);
