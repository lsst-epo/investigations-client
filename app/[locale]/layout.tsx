import { PropsWithChildren } from "react";
import "focus-visible";
import SourceSansPro from "@/lib/fonts";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/styles";
import UIDReset from "@/lib/reset";
import { fallbackLng } from "@/lib/i18n/settings";
import { queryAPI } from "@/lib/fetch";
import "@/styles/styles.scss";
import { GlobalDataProvider, GlobalData } from "@/contexts/GlobalData";
import { AuthDialogManagerProvider } from "@/contexts/AuthDialogManager";
import I18NextClientProvider from "@/contexts/i18next";
import { graphql } from "@/gql/public-schema";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Body from "@/page/Body";
import { getSite } from "@/helpers";

export interface RootLayoutParams {
  locale: string;
}

interface RootLayoutProps {
  params: RootLayoutParams;
}

const GlobalsQuery = graphql(`
  query GlobalsQuery($site: [String]) {
    siteInfo: globalSet(site: $site, handle: "siteInfo") {
      ... on siteInfo_GlobalSet {
        language
        name
        handle
        siteTitle
        siteDescription
      }
    }
    menuContent: globalSet(site: $site, handle: "menuContent") {
      ... on menuContent_GlobalSet {
        helpUrl
      }
    }
  }
`);

const getGlobals = async (locale = "en"): Promise<GlobalData | undefined> => {
  const site: string = getSite(locale);

  const { data } = await queryAPI({
    query: GlobalsQuery,
    variables: {
      site: [site],
    },
  });

  if (!data) {
    return undefined;
  }

  const { siteInfo, menuContent } = data;

  return {
    siteInfo,
    menuContent,
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
  const description = globalData?.siteInfo?.siteDescription;

  return { description };
}

const RootLayout: (
  props: PropsWithChildren<RootLayoutProps>
) => Promise<JSX.Element> = async ({
  params: { locale = fallbackLng },
  children,
}) => {
  const globalData = await getGlobals(locale);

  if (!globalData) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head></head>
      <Body className={SourceSansPro.variable}>
        <UIDReset>
          <StyledComponentsRegistry>
            <GlobalStyles includeFonts={false} />
            <I18NextClientProvider locale={locale}>
              <GlobalDataProvider data={globalData}>
                <AuthDialogManagerProvider>
                  {children}
                </AuthDialogManagerProvider>
              </GlobalDataProvider>
            </I18NextClientProvider>
          </StyledComponentsRegistry>
        </UIDReset>
      </Body>
    </html>
  );
};

export default RootLayout;
