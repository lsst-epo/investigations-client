import { Metadata } from "next";
import { RootLayoutParams } from "../layout";
import { PropsWithChildren, ReactNode } from "react";
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

export interface InvestigationParams {
  investigation: string;
}

export interface InvestigationLandingProps {
  params: RootLayoutParams & InvestigationParams;
  modal: ReactNode;
}

const MockInvestigations: { [key: string]: string } = {
  "coloring-the-universe": "Coloring the Universe",
};

export async function generateMetadata({
  params: { investigation },
}: InvestigationLandingProps): Promise<Metadata> {
  const title = MockInvestigations[investigation];

  return { title, twitter: { title } };
}

const InvestigationIdQuery = graphql(`
  query InvestigationId($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      id
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
`);

const InvestigationLandingLayout: (
  props: PropsWithChildren<InvestigationLandingProps>
) => Promise<JSX.Element> = async ({
  children,
  modal,
  params: { locale, investigation },
}) => {
  const site = locale === "en" ? "default" : locale;

  const { data: investigationData } = await queryAPI({
    query: InvestigationIdQuery,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  const { children: pages = [] } = investigationData?.entry;

  console.log({ pages });

  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);
  const StoredAnswersComponent =
    user?.group === "educators" ? EducatorStoredAnswers : StudentStoredAnswers;

  return (
    <StoredAnswersComponent investigationId={investigationData?.entry?.id}>
      <PagesProvider {...{ pages }}>
        <QuestionsProvider>
          {children}
          {modal}
        </QuestionsProvider>
      </PagesProvider>
    </StoredAnswersComponent>
  );
};

export default InvestigationLandingLayout;
