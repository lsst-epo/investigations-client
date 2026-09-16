import { ComponentProps, FunctionComponent, use } from "react";
import { FragmentType, graphql, useFragment } from "@/gql/educator-schema";
import ContentBlockFactory from "@/components/factories/ContentBlockFactory";
import * as Styled from "./styles";
import { getUserFromJwt } from "@/components/auth/serverHelpers";
import Container from "@rubin-epo/epo-react-lib/Container";
import { Button } from "@rubin-epo/epo-react-lib";
import { useTranslation } from "@/lib/i18n/server";
import InvestigationHero from "@/components/layout/InvestigationHero";
import GuideNavigation from "@/components/layout/GuideNavigation";
import AssessmentAuthWrapper from "@/components/templates/AssessmentAuthWrapper";

const Fragment = graphql(`
  fragment AssessmentContentTemplate on assessments_default_Entry {
    __typename
    title
    id
    uri
    contentBlocks {
      __typename
      ...ContentBlockFactory
    }
    investigationEntry {
      ... on investigations_investigationParent_Entry {
        __typename
        id
        title
        uri
        relatedAssessments {
          ... on assessments_default_Entry {
            __typename
            id
            title
            uri
            ...GuideNavigationPage
          }
        }
        ...InvestigationHero
      }
    }
  }
`);

const AssessmentContentPage: FunctionComponent<{
  data: FragmentType<typeof Fragment>;
  site: string;
  locale: string;
  user: ReturnType<typeof getUserFromJwt>;
  status?: string;
}> = ({ site, locale, user, status, ...props }) => {
  const data = useFragment(Fragment, props.data);

  const { t } = use(useTranslation(locale, "translation"));

  const { title, id, uri } = data;

  const investigationEntry =
    data.investigationEntry[0]?.__typename ===
    "investigations_investigationParent_Entry"
      ? data.investigationEntry[0]
      : null;

  const relatedAssessments =
    investigationEntry?.relatedAssessments?.filter(
      (assessment) => assessment?.__typename === "assessments_default_Entry",
    ) || [];

  const pageIndex =
    relatedAssessments.findIndex((assessment) => assessment?.uri === uri) || 0;

  const prevEntry = relatedAssessments[pageIndex - 1];

  const nextEntry = relatedAssessments[pageIndex + 1];

  return (
    <AssessmentAuthWrapper user={user} title={title}>
      {investigationEntry && (
        <div>
          <InvestigationHero
            data={
              investigationEntry as ComponentProps<
                typeof InvestigationHero
              >["data"]
            }
          />
        </div>
      )}
      {relatedAssessments && (
        <div>
          <GuideNavigation
            pages={
              relatedAssessments as ComponentProps<
                typeof GuideNavigation
              >["pages"]
            }
            title={t("assessment.assessment")}
            currentUri={uri}
          />
        </div>
      )}

      <Container paddingSize="large" bgColor={"white"}>
        <Styled.Header>
          <Styled.Title>{title}</Styled.Title>
        </Styled.Header>
      </Container>

      {data.contentBlocks?.map((block, i) =>
        block && block.__typename === "contentBlocks_text_BlockType" ? (
          <Container paddingSize="large" key={i}>
            <ContentBlockFactory
              site={site}
              data={block as ComponentProps<typeof ContentBlockFactory>["data"]}
              pageId={id || undefined}
              locale={locale}
            />
          </Container>
        ) : (
          block && (
            <ContentBlockFactory
              key={i}
              site={site}
              data={block as ComponentProps<typeof ContentBlockFactory>["data"]}
              pageId={id || undefined}
              locale={locale}
            />
          )
        ),
      )}

      {investigationEntry?.uri && (
        <Container>
          <Styled.SiblingNav aria-label={t("nav.page")}>
            <Button
              as="a"
              href={`/${prevEntry?.uri}`}
              aria-disabled={!prevEntry?.uri}
              isBlock
            >
              {prevEntry?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("pagination.previous_name", {
                      name: prevEntry?.title,
                    }),
                  }}
                />
              ) : (
                t("pagination.previous")
              )}
            </Button>
            <Button
              as="a"
              href={`/${nextEntry?.uri}`}
              aria-disabled={!nextEntry?.uri}
              isBlock
            >
              {nextEntry?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("pagination.next_name", {
                      name: nextEntry?.title,
                    }),
                  }}
                />
              ) : (
                t("pagination.next")
              )}
            </Button>
            <Button as="a" href={`/${investigationEntry.uri}`} isBlock>
              Back to {investigationEntry.title}
            </Button>
          </Styled.SiblingNav>
        </Container>
      )}
    </AssessmentAuthWrapper>
  );
};

export default AssessmentContentPage;
