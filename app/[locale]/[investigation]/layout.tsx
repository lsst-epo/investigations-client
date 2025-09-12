import { Metadata } from "next";
import { RootParams } from "../layout";
import { FunctionComponent, PropsWithChildren } from "react";
import { queryAPI } from "@/lib/fetch";
import { graphql } from "@/gql/public-schema";
import StudentStoredAnswers from "@/components/student-schema/StoredAnswersWrapper";
import EducatorStoredAnswers from "@/components/educator-schema/StoredAnswersWrapper";
import {
  getUserFromJwt
} from "@/components/auth/serverHelpers";
import { PagesProvider } from "@/contexts/Pages";
import { QuestionsProvider } from "@/contexts/Questions";
import { notFound } from "next/navigation";
import { getSite } from "@/helpers";

export interface InvestigationParams {
  investigation: string;
}

export interface InvestigationProps {
  params: Promise<RootParams & InvestigationParams>;
  searchParams: Promise<Record<string, string | Array<string> | undefined>>;
}

const InvestigationMetadataQuery = graphql(`
  query InvestigationMetadata($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ... on investigations_investigationParent_Entry {
        title
      }
    }
  }
`);

export async function generateMetadata(props: InvestigationProps): Promise<Metadata> {
  const params = await props.params;

  const {
    investigation,
    locale
  } = params;

  const site = getSite(locale);

  const { data } = await queryAPI({
    query: InvestigationMetadataQuery,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  const { title } = data?.entry || {};

  return { title, twitter: { title } };
}

export const generateStaticParams = async ({
  params: { locale },
}: InvestigationProps) => {
  const site = getSite(locale);

  const InvestigationParamsQuery = graphql(`
    query InvestigationParams($site: [String]) {
      investigationsEntries(site: $site, level: 1) {
        ... on investigations_investigationParent_Entry {
          slug
        }
      }
    }
  `);

  const { data } = await queryAPI({
    query: InvestigationParamsQuery,
    variables: {
      site: [site],
    },
  });

  return data?.investigationsEntries?.map((entry) => {
    if (entry?.__typename === "investigations_investigationParent_Entry") {
      return { investigation: entry.slug };
    }
  });
};

// show 404 for any investigation not pre-defined
export const dynamicParams = false;

const InvestigationIdQuery = graphql(`
  query InvestigationId($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ... on investigations_investigationParent_Entry {
        __typename
        id
        acknowledgements: text
        children {
          __typename
          title
          id
          uri
          ... on investigations_default_Entry {
            hasSavePoint
            contentBlocks {
              __typename
              ...QuestionsBlock
              ... on contentBlocks_twoColumnContainer_BlockType {
                columns: children {
                  __typename
                  ... on contentBlocks_colLeft_BlockType {
                    children {
                      ...QuestionsBlock
                      ... on contentBlocks_group_BlockType {
                        group: children {
                          ...QuestionsBlock
                        }
                      }
                    }
                  }
                  ... on contentBlocks_colRight_BlockType {
                    children {
                      __typename
                      ...QuestionsBlock
                      ... on contentBlocks_group_BlockType {
                        group: children {
                          ... on contentBlocks_questionBlock_BlockType {
                            __typename
                            questionEntries {
                              ...QuestionEntry
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on contentBlocks_group_BlockType {
                group: children {
                  ...QuestionsBlock
                }
              }
            }
          }
        }
      }
    }
  }
`);

const InvestigationLandingLayout: FunctionComponent<
  PropsWithChildren<InvestigationProps>
> = async props => {
  const params = await props.params;

  const {
    locale,
    investigation
  } = params;

  const {
    children
  } = props;

  const site = getSite(locale);

  const { data } = await queryAPI({
    query: InvestigationIdQuery,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  if (data?.entry?.__typename !== "investigations_investigationParent_Entry") {
    notFound();
  }

  const { children: pages = [], acknowledgements } = data.entry;
  let craftToken;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/auth-cookies",
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error(err.message || "Unexpected error while retrieving cookies");
    }
    craftToken = (await res.json()).authCookies.craftToken;
  } catch (error: any) {
      console.error(error.message || "Failed to retrieve cookies");
  }

  const user = getUserFromJwt(craftToken);
  const StoredAnswersComponent =
    user?.group === "educators" ? EducatorStoredAnswers : StudentStoredAnswers;

  return (
    <StoredAnswersComponent investigationId={data.entry?.id}>
      <PagesProvider {...{ pages, acknowledgements }}>
        <QuestionsProvider>{children}</QuestionsProvider>
      </PagesProvider>
    </StoredAnswersComponent>
  );
};

export default InvestigationLandingLayout;
