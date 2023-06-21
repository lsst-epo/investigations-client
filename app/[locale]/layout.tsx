import { PropsWithChildren } from "react";
import "focus-visible";
import { createClient, fetchExchange } from "@urql/core";
import SourceSansPro from "@/lib/fonts";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/styles";
import UIDReset from "@/lib/reset";
import { fallbackLng } from "@/lib/i18n/settings";
import "@/styles/styles.scss";
import { GlobalDataProvider, GlobalData } from "@/contexts/GlobalData";
import { graphql } from "@/gql";
import { Metadata } from "next";
import Body from "@/global/Body";
import Header from "@/global/Header";

export interface RootLayoutParams {
  locale: string;
}

interface RootLayoutProps {
  params: RootLayoutParams;
}

const getGlobals = async (locale = "en"): Promise<GlobalData> => {
  const site: string = locale === "en" ? "default" : locale;

  const client = createClient({
    url: process.env.NEXT_PUBLIC_API_URL as string,
    exchanges: [fetchExchange],
  });

  const data = await client
    .query(GlobalsQuery, {
      site: [site],
      section: ["pages"],
    })
    .toPromise()
    .then((result) => {
      return result.data;
    });

  return {
    categories: data?.categories,
    headerNavItems: data?.headerNavItems,
    siteInfo: data?.siteInfo,
    rootPage: [],
    localeInfo: {
      locale: site,
      language: locale,
      localized: [],
    },
  };
};

export async function generateMetadata({
  params: { locale },
}: RootLayoutProps): Promise<Metadata> {
  const globalData = await getGlobals(locale);
  const description = globalData.siteInfo?.siteDescription;

  return { description };
}

const RootLayout: (
  props: PropsWithChildren<RootLayoutProps>
) => Promise<JSX.Element> = async ({
  params: { locale = fallbackLng },
  children,
}) => {
  const globalData = await getGlobals(locale);

  return (
    <html lang={locale}>
      <head></head>
      <body className={SourceSansPro.variable}>
        <UIDReset>
          <StyledComponentsRegistry>
            <GlobalStyles includeFonts={false} />
            <GlobalDataProvider data={globalData}>
              <Body>
                <Header />
                {children}
              </Body>
            </GlobalDataProvider>
          </StyledComponentsRegistry>
        </UIDReset>
      </body>
    </html>
  );
};

export default RootLayout;

const GlobalsQuery = graphql(`
  query GlobalsQuery($site: [String], $section: [String]) {
    headerNavItems: entries(section: $section, site: $site, level: 1) {
      id
      title
      uri
      children {
        id
        title
        uri
      }
    }
    siteInfo: globalSet(site: $site, handle: "siteInfo") {
      ... on siteInfo_GlobalSet {
        language
        name
        handle
        siteTitle
        siteDescription
      }
    }
    categories(site: $site) {
      id
      slug
      groupHandle
      title
    }
  }
`);
