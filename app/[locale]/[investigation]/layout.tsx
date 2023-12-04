import { Metadata } from "next";
import { RootLayoutParams } from "../layout";
import { PropsWithChildren } from "react";
import { queryAPI } from "@/lib/fetch";
import { graphql } from "@/gql/public-schema";
import StudentStoredAnswers from "@/components/student-schema/StoredAnswersWrapper";
import EducatorStoredAnswers from "@/components/educator-schema/StoredAnswersWrapper";
import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import { PagesProvider } from "@/contexts/Pages";
import { QuestionsProvider } from "@/contexts/Questions";
import { notFound } from "next/navigation";
import { getSite } from "@/helpers";

export interface InvestigationParams {
  investigation: string;
}

export interface InvestigationLandingProps {
  params: RootLayoutParams & InvestigationParams;
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

export async function generateMetadata({
  params: { investigation, locale },
}: InvestigationLandingProps): Promise<Metadata> {
  const site = getSite(locale);

  const { data } = await queryAPI({
    query: InvestigationMetadataQuery,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  const { title } = data?.entry;

  return { title, twitter: { title } };
}

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

const InvestigationLandingLayout: (
  props: PropsWithChildren<InvestigationLandingProps>
) => Promise<JSX.Element> = async ({
  children,
  params: { locale, investigation },
}) => {
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

  const { craftToken } = await getAuthCookies();
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
