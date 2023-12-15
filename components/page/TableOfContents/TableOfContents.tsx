import { FunctionComponent, useContext, useRef } from "react";
import { Trans } from "react-i18next";
import Slideout from "@rubin-epo/epo-react-lib/Slideout";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import ProgressBar from "@rubin-epo/epo-react-lib/ProgressBar";
import { useFocusTrap } from "@/hooks";
import useProgress from "@/contexts/Progress";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import HeaderProgress from "@/components/page/HeaderProgress";
import * as Styled from "./styles";
import usePages from "@/contexts/Pages";
import useQuestions from "@/contexts/Questions";

interface TableOfContentsProps {
  isOpen: boolean;
  onOpenCallback?: () => void;
  onCloseCallback?: () => void;
  labelledById?: string;
}

const TableOfContents: FunctionComponent<TableOfContentsProps> = ({
  isOpen,
  onOpenCallback,
  onCloseCallback,
  labelledById,
}) => {
  const contentsRef = useRef(null);
  const pagesVisitedId = "pagesVisitedLabel";
  const questionsAnsweredId = "questionsAnsweredLabel";
  const { sections, pages, totalPages } = usePages();
  const questions = useQuestions();
  const { currentPageNumber, disabledByPage } = useProgress();
  const { answers } = useContext(StoredAnswersContext);

  useFocusTrap(contentsRef, isOpen);

  const callbackRef = (node: HTMLButtonElement) => {
    if (node) {
      setTimeout(() => {
        node.focus();
      });
    }
  };

  return (
    <Slideout
      slideFrom="right"
      {...{ isOpen, onOpenCallback, onCloseCallback }}
    >
      <Styled.TableOfContents
        ref={contentsRef}
        role="dialog"
        aria-labelledby={labelledById}
      >
        <Styled.CloseButton
          ref={callbackRef}
          onClick={() => onCloseCallback && onCloseCallback()}
        >
          <IconComposer icon="Close" />
        </Styled.CloseButton>
        <Styled.ProgressContainer>
          <span id={pagesVisitedId}>
            <Trans>translation:table_of_contents.pages</Trans>
          </span>
          <HeaderProgress
            labelledById={pagesVisitedId}
            backgroundColor="transparent"
            padding={false}
          />
        </Styled.ProgressContainer>
        <Styled.ProgressContainer>
          <span id={questionsAnsweredId}>
            <Trans>translation:table_of_contents.questions</Trans>
          </span>
          <ProgressBar
            max={questions.byAll.length}
            value={Object.keys(answers).length}
            labelledById={questionsAnsweredId}
            markerConfig={{ $hoverable: false }}
          />
        </Styled.ProgressContainer>
        {sections && pages && (
          <nav>
            <Styled.SectionList role="list">
              {sections.map(({ name, pages: pageNumbers }) => (
                <Styled.Section key={name}>
                  <Styled.SectionTitle>{name}</Styled.SectionTitle>
                  <Styled.PageList role="list">
                    {pageNumbers.map((pageNumber) => {
                      const pageIndex = pageNumber - 1;
                      const { title, uri } = pages[pageIndex];
                      const url = `/${uri}`;
                      const isDisabled = disabledByPage[pageIndex];
                      const isSectionBreak =
                        pageIndex > 0 && pages[pageIndex - 1].hasSavePoint;
                      const isLastPage = pageNumber === totalPages;

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
                            <Styled.PageNumber
                              style={{
                                "--page-number-background":
                                  !isDisabled && "var(--section-accent-color)",
                              }}
                            >
                              {isSectionBreak || pageNumber === totalPages ? (
                                <Styled.CheckpointIcon
                                  role="presentation"
                                  style={{
                                    "--icon-background":
                                      !isLastPage &&
                                      "var(--turquoise10, #d9f7f6)",
                                  }}
                                >
                                  <IconComposer
                                    icon={
                                      isLastPage ? "checkeredFlag" : "thumbtack"
                                    }
                                    size={16}
                                  />
                                </Styled.CheckpointIcon>
                              ) : (
                                pageNumber
                              )}
                            </Styled.PageNumber>
                            <Styled.LinkText>{title}</Styled.LinkText>
                          </Styled.PageLink>
                        </Styled.Page>
                      );
                    })}
                  </Styled.PageList>
                </Styled.Section>
              ))}
            </Styled.SectionList>
          </nav>
        )}
      </Styled.TableOfContents>
    </Slideout>
  );
};

TableOfContents.displayName = "Page.TableOfContents";

export default TableOfContents;
