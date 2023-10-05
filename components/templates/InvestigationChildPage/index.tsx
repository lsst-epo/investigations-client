"use client";
import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import SaveForm from "@/components/answers/SaveForm/SaveForm";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import * as Styled from "./styles";

const Fragment = graphql(`
  fragment InvestigationChildPageTemplate on investigations_default_Entry {
    __typename
    id
    title
    contentBlocks {
      ...ContentBlockFactory
    }
    hasSavePoint
    prev(section: "investigations") {
      __typename
      uri
    }
    next(section: "investigations") {
      __typename
      uri
    }
    parent {
      id
      children(section: "investigations", type: "default") {
        ... on investigations_investigationSectionBreakChild_Entry {
          __typename
          id
          title
          uri
        }
        ... on investigations_default_Entry {
          __typename
          id
          title
          hasSavePoint
          uri
          contentBlocks {
            ... on contentBlocks_questionBlock_BlockType {
              __typename
              questionEntries {
                ... on questions_default_Entry {
                  id
                }
              }
            }
            ... on contentBlocks_twoColumnContainer_BlockType {
              __typename
              columns: children {
                ... on contentBlocks_colLeft_BlockType {
                  __typename
                  children {
                    ... on contentBlocks_questionBlock_BlockType {
                      __typename
                      questionEntries {
                        ... on questions_default_Entry {
                          id
                        }
                      }
                    }
                    ... on contentBlocks_group_BlockType {
                      __typename
                      group: children {
                        ... on contentBlocks_questionBlock_BlockType {
                          __typename
                          questionEntries {
                            ... on questions_default_Entry {
                              id
                            }
                          }
                        }
                      }
                    }
                  }
                }
                ... on contentBlocks_colRight_BlockType {
                  __typename
                  children {
                    ... on contentBlocks_questionBlock_BlockType {
                      __typename
                      questionEntries {
                        ... on questions_default_Entry {
                          id
                        }
                      }
                    }
                    ... on contentBlocks_group_BlockType {
                      __typename
                      group: children {
                        ... on contentBlocks_questionBlock_BlockType {
                          __typename
                          questionEntries {
                            ... on questions_default_Entry {
                              id
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on contentBlocks_group_BlockType {
              __typename
              group: children {
                ... on contentBlocks_questionBlock_BlockType {
                  __typename
                  questionEntries {
                    ... on questions_default_Entry {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

const InvestigationChildPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  user?: ReturnType<typeof getUserFromJwt>;
  children?: React.ReactNode;
}> = (props) => {
  const data = useFragment(Fragment, props.data);

  if (!data?.title) return null;

  return (
    <Styled.ContentBlocks paddingSize="none" width="wide">
      <Styled.Title>{data.title}</Styled.Title>
      {props.children}
      {data.contentBlocks?.map(
        (block, i) =>
          block && (
            <ContentBlockFactory key={i} site={props.site} data={block} />
          )
      )}
      {data.hasSavePoint && props.user && (
        <SaveForm investigationId={data.parent?.id} user={props.user} />
      )}
    </Styled.ContentBlocks>
  );
};

InvestigationChildPage.displayName = "Template.InvestigationChildPage";

export default InvestigationChildPage;
