import "focus-visible";
import "@/styles/styles.scss";
import { FunctionComponent, PropsWithChildren } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { graphql } from "@/gql/public-schema";
import { SourceSansPro } from "@/lib/fonts";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/lib/styles";
import { fallbackLng, languages } from "@/lib/i18n/settings";
import { queryAPI } from "@/lib/fetch";
import { GlobalDataProvider, GlobalData } from "@/contexts/GlobalData";
import { AuthDialogManagerProvider } from "@/contexts/AuthDialogManager";
import I18NextClientProvider from "@/contexts/i18next";
import Body from "@/page/Body";
import { getSite } from "@/helpers";
import AuthDialogs from "@/components/auth/AuthDialogs";
import { getAuthCookies } from "@/components/auth/serverHelpers";

export interface RootParams {
  locale: string;
}

export interface RootProps {
  params: Promise<RootParams>;
  searchParams: Promise<Record<string, string | Array<string> | undefined>>;
}

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

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

export async function generateMetadata(props: RootProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const globalData = await getGlobals(locale);
  const description = globalData?.siteInfo?.siteDescription;

  return { description };
}

export const generateStaticParams = () => {
  return languages.map((locale) => {
    return { locale };
  });
};

const RootLayout: FunctionComponent<PropsWithChildren<RootProps>> = async props => {
  const params = await props.params;

  const {
    locale = fallbackLng
  } = params;

  const {
    children
  } = props;

  const globalData = await getGlobals(locale);

  if (!globalData) {
    notFound();
  }

  const { craftToken } = await getAuthCookies();

  return (
    <html lang={locale}>
      <head></head>
      <Body className={SourceSansPro.variable}>
        <StyledComponentsRegistry>
          <GlobalStyles includeFonts={false} />
          <I18NextClientProvider locale={locale}>
            <GlobalDataProvider data={globalData}>
              <AuthDialogManagerProvider>
                {children}
                <AuthDialogs isAuthenticated={!!craftToken} />
              </AuthDialogManagerProvider>
            </GlobalDataProvider>
          </I18NextClientProvider>
        </StyledComponentsRegistry>
      </Body>
      {PLAUSIBLE_DOMAIN && (
        <Script
          id="plausible-script"
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
      )}
    </html>
  );
};

export default RootLayout;
