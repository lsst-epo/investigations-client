import { FunctionComponent } from "react";
import type { Metadata } from "next";
import { graphql } from "@/gql/public-schema";
import { queryAPI } from "@/lib/fetch";
import { serverTranslation } from "@/lib/i18n";
import { ReviewPageProps } from "./layout";

import {
  getAuthCookies,
  getUserFromJwt,
} from "@/components/auth/serverHelpers";
import ReviewTemplate from "@/components/templates/ReviewPage";
import { getSite } from "@/helpers";
import { getPageQuestionEntries } from "@/helpers/questions";

const Query = graphql(`
  query ReviewPage($site: [String], $uri: [String]) {
    entry(site: $site, uri: $uri) {
      ... on investigations_investigationParent_Entry {
        title
        children {
          ... on investigations_default_Entry {
            contentBlocks {
              ...QuestionsBlock
              ... on contentBlocks_twoColumnContainer_BlockType {
                columns: children {
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
                      ...QuestionsBlock
                      ... on contentBlocks_group_BlockType {
                        group: children {
                          ... on contentBlocks_questionBlock_BlockType {
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

export async function generateMetadata({
  params: { locale },
}: ReviewPageProps): Promise<Metadata> {
  const { t } = await serverTranslation(locale, "translation");
  return {
    title: t("review.metadata.title"),
  };
}

const ReviewPage: FunctionComponent<ReviewPageProps> = async ({
  params: { locale, investigation },
}) => {
  const { craftToken } = await getAuthCookies();
  const user = getUserFromJwt(craftToken);
  const site = getSite(locale);

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      uri: [investigation],
    },
  });

  const questions = data?.entry.children
    .map(({ contentBlocks }) => getPageQuestionEntries(contentBlocks))
    .flat();

  return (
    <ReviewTemplate
      investigation={data?.entry?.title}
      {...{ user, locale, questions }}
    />
  );
};

export default ReviewPage;
