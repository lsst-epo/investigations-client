import { FunctionComponent, useContext } from "react";
import { IconComposer, ProgressBar } from "@rubin-epo/epo-react-lib";
import useProgress from "@/contexts/Progress";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import HeaderProgress from "@/components/page/HeaderProgress";
import SlideOutMenu from "./SlideOutMenu";
import * as Styled from "./styles";
import usePages from "@/contexts/Pages";
import useQuestions from "@/contexts/Questions";

// interface PageNavigation {
//   title: string;
//   pageNumber: number;
//   url: string;
//   visited: boolean;
//   checkpoint?: boolean;
//   final?: boolean;
//   disabled: boolean;
// }

// interface InvestigationSection {
//   title: string;
//   pages: PageNavigation[];
// }

interface TableOfContentsProps {
  id: string;
  title: string;
  isOpen: boolean;
  onOpenCallback?: () => void;
  onCloseCallback?: () => void;
  questions: number;
  answered: number;
  labelledById?: string;
}

const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  id,
  title,
  isOpen,
  onOpenCallback,
  onCloseCallback,
  labelledById,
}) => {
  const pagesVisitedId = "pagesVisitedLabel";
  const questionsAnsweredId = "questionsAnsweredLabel";
  const { sections, pages, totalPages } = usePages();
  const questions = useQuestions();
  const { currentPageNumber, disabledByPage } = useProgress();
  const { answers } = useContext(StoredAnswersContext);

  return (
    <SlideOutMenu
      id={id}
      title={title}
      isOpen={isOpen}
      onOpenCallback={onOpenCallback}
      onCloseCallback={onCloseCallback}
    >
      <Styled.TableOfContents>
        <Styled.ProgressContainer>
          <Styled.ProgressLabel id={pagesVisitedId}>
            Pages visited
          </Styled.ProgressLabel>
          <HeaderProgress
            labelledById={pagesVisitedId}
            backgroundColor="transparent"
            padding={false}
          />
        </Styled.ProgressContainer>
        <Styled.ProgressContainer>
          <Styled.ProgressLabel id={questionsAnsweredId}>
            Questions answered
          </Styled.ProgressLabel>
          <ProgressBar
            max={questions.byAll.length}
            value={Object.keys(answers).length}
            labelledById={questionsAnsweredId}
            markerConfig={{ $hoverable: false }}
          />
        </Styled.ProgressContainer>
        {sections && pages && (
          <Styled.Navigation aria-labelledby={labelledById}>
            <Styled.SectionList role="list">
              {sections.map(({ name, pages: pageNumbers }) => (
                <Styled.Section key={name}>
                  <Styled.SectionTitle>{name}</Styled.SectionTitle>
                  <Styled.PageList role="list">
                    {pageNumbers.map((pageNumber) => {
                      const pageIndex = pageNumber - 1;
                      const { title, uri, hasSavePoint } = pages[pageIndex];
                      const url = uri ? `/${uri}` : undefined;
                      const isDisabled = disabledByPage[pageIndex];
                      // console.log(pageNumber, isDisabled);
                      return (
                        <Styled.Page key={pageNumber}>
                          <Styled.PageLink
                            href={isDisabled ? "#" : url}
                            aria-disabled={isDisabled}
                            role={isDisabled ? "link" : undefined}
                            aria-current={
                              currentPageNumber === pageNumber
                                ? "page"
                                : undefined
                            }
                          >
                            <Styled.PageNumber $visited={!isDisabled}>
                              {hasSavePoint || pageNumber === totalPages ? (
                                <Styled.CheckpointIcon
                                  $checkpoint={hasSavePoint}
                                >
                                  <IconComposer
                                    icon={
                                      hasSavePoint
                                        ? "thumbtack"
                                        : "checkeredFlag"
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
                      );
                    })}
                  </Styled.PageList>
                </Styled.Section>
              ))}
            </Styled.SectionList>
          </Styled.Navigation>
        )}
      </Styled.TableOfContents>
    </SlideOutMenu>
  );
};

TableOfContents.displayName = "Page.TableOfContents";

export default TableOfContents;
