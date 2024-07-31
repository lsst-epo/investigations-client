import { FunctionComponent, PropsWithChildren, ReactNode } from "react";
import { RootParams } from "../../layout";
import { InvestigationParams } from "../layout";
import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { ProgressProvider } from "@/contexts/Progress";
import { notFound } from "next/navigation";
import Header from "@/page/Header/Header";
import Pager from "@/page/Pager";
import Toaster from "@/components/layout/Toaster";
import * as Styled from "./styles";
import { getSite } from "@/helpers";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";

export interface InvestigationPageParams {
  page: string;
}

export interface InvestigationPageProps {
  params: RootParams & InvestigationParams & InvestigationPageParams;
  searchParams: Record<string, string | Array<string> | undefined>;
  reference: ReactNode;
}

const Query = graphql(`
  query InvestigationChildPage($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ...InvestigationChildPageTemplate
      ...InvestigationSectionBreakTemplate
    }
  }
`);

export const generateStaticParams = async () => {
  const InvestigationParamsQuery = graphql(`
    query InvestigationPageParams {
      investigationsEntries(level: 2) {
        ... on investigations_default_Entry {
          slug
          parent {
            slug
          }
        }
        ... on investigations_investigationSectionBreakChild_Entry {
          slug
          parent {
            slug
          }
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query: InvestigationParamsQuery,
    variables: {},
  });

  return data?.investigationsEntries?.map((entry) => {
    if (
      entry?.__typename === "investigations_default_Entry" ||
      entry?.__typename ===
        "investigations_investigationSectionBreakChild_Entry"
    ) {
      const { slug, parent } = entry;

      return { page: slug, investigation: parent?.slug };
    }
  });
};

// show 404 for any investigation not pre-defined
export const dynamicParams = false;

const InvestigationPageLayout: FunctionComponent<
  PropsWithChildren<InvestigationPageProps>
> = async ({
  children,
  reference,
  params: { locale, investigation, page },
}) => {
  const site = getSite(locale);
  const uri = `${investigation}/${page}`;

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [uri],
    },
  });

  const { __typename } = data?.entry || {};

  const isValidType =
    __typename === "investigations_default_Entry" ||
    __typename === "investigations_investigationSectionBreakChild_Entry";

  if (!isValidType) {
    notFound();
  }

  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);

  const { id } = data?.entry || {};

  return (
    <ProgressProvider currentPageId={id}>
      <Header {...{ user }} />
      <Styled.Main>
        {children}
        {reference}
      </Styled.Main>
      <Pager enableAll={user?.group === "educators"} />
      <Toaster />
    </ProgressProvider>
  );
};

export default InvestigationPageLayout;
