import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { IconComposer, ProgressBar } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";

interface PageNavigation {
  title: string;
  pageNumber: number;
  url: string;
  visited: boolean;
  checkpoint?: boolean;
  final?: boolean;
  disabled: boolean;
}

interface InvestigationSection {
  title: string;
  pages: PageNavigation[];
}

interface TableOfContentsProps {
  sections: InvestigationSection[];
  questions: number;
  answered: number;
  labelledById?: string;
}

const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  sections = [],
  questions,
  answered = 0,
  labelledById,
}) => {
  const { pathname } = useRouter();

  const totalPages = sections.reduce(
    (prev, curr) => prev + curr.pages.length,
    0
  );
  const pagesVisited = sections.reduce(
    (prev, { pages }) =>
      prev + pages.reduce((prev, { visited }) => prev + (visited ? 1 : 0), 0),
    0
  );

  const pagesVisitedId = "pagesVisitedLabel";
  const questionsAnsweredId = "questionsAnsweredLabel";

  return (
    <Styled.TableOfContents>
      <Styled.ProgressContainer>
        <Styled.ProgressLabel id={pagesVisitedId}>
          Pages visited
        </Styled.ProgressLabel>
        <ProgressBar
          max={totalPages}
          value={pagesVisited}
          labelledById={pagesVisitedId}
          markerConfig={{ $hoverable: false }}
        />
      </Styled.ProgressContainer>
      <Styled.ProgressContainer>
        <Styled.ProgressLabel id={questionsAnsweredId}>
          Questions answered
        </Styled.ProgressLabel>
        <ProgressBar
          max={questions}
          value={answered}
          labelledById={questionsAnsweredId}
          markerConfig={{ $hoverable: false }}
        />
      </Styled.ProgressContainer>
      <Styled.Navigation aria-labelledby={labelledById}>
        <Styled.SectionList role="list">
          {sections.map(({ title, pages }) => (
            <Styled.Section key={title}>
              <Styled.SectionTitle>{title}</Styled.SectionTitle>
              <Styled.PageList role="list">
                {pages.map(
                  ({
                    title,
                    pageNumber,
                    url,
                    visited,
                    checkpoint,
                    disabled,
                    final,
                  }) => (
                    <Styled.Page key={pageNumber}>
                      <Styled.PageLink
                        href={disabled ? {} : url}
                        aria-disabled={disabled || undefined}
                        role={disabled ? "link" : undefined}
                        aria-current={url === pathname ? "page" : undefined}
                      >
                        <Styled.PageNumber $visited={visited}>
                          {checkpoint || final ? (
                            <Styled.CheckpointIcon $checkpoint={checkpoint}>
                              <IconComposer
                                icon={
                                  checkpoint ? "thumbtack" : "checkeredFlag"
                                }
                                size={16}
                              />
                            </Styled.CheckpointIcon>
                          ) : (
                            pageNumber
                          )}
                        </Styled.PageNumber>

                        {title}
                      </Styled.PageLink>
                    </Styled.Page>
                  )
                )}
              </Styled.PageList>
            </Styled.Section>
          ))}
        </Styled.SectionList>
      </Styled.Navigation>
    </Styled.TableOfContents>
  );
};

TableOfContents.displayName = "Page.TableOfContents";

export default TableOfContents;
