"use client";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import useResizeObserver from "use-resize-observer";
import useProgress from "@/contexts/Progress";
import usePages, { Page } from "@/contexts/Pages";
import * as Styled from "./styles";

interface PagerProps {
  leftText?: string;
  rightText?: string;
  className?: string;
  enableAll?: boolean;
}

const getPreviousPage = (
  pages: Array<Page>,
  pageIndex: number,
  pageId: string
): string | undefined => {
  const isFirstPage = pageIndex === 0;
  const isCustomPage = pageIndex === -1;

  if (isCustomPage) {
    switch (pageId) {
      case "review":
        return `/${pages[pages.length - 1].uri}`;
      default:
        break;
    }
  }

  if (isFirstPage) {
    return undefined;
  }

  return `/${pages[pageIndex - 1].uri}`;
};

const getNextPage = (
  pages: Array<Page>,
  pageIndex: number,
  pageId: string
): string | undefined => {
  const isLastPage = pageIndex === pages.length - 1;
  const isCustomPage = pageIndex === -1;

  if (isCustomPage) {
    switch (pageId) {
      case "review":
        return undefined;
      default:
        break;
    }
  }

  if (isLastPage) {
    return undefined;
  }

  return `/${pages[pageIndex + 1].uri}`;
};

const getNextDisabled = ({
  currentPageAnswered,
  enableAll,
  nextPage,
}: {
  currentPageAnswered: boolean;
  enableAll: boolean;
  nextPage: ReturnType<typeof getNextPage>;
}): boolean => {
  if (nextPage) {
    if (enableAll) {
      return false;
    }

    return !(currentPageAnswered === true || currentPageAnswered === undefined);
  }

  return true;
};

const Pager: FunctionComponent<PagerProps> = ({
  leftText,
  rightText,
  className,
  enableAll = false,
}) => {
  const { t } = useTranslation();
  const { ref } = useResizeObserver({
    onResize: ({ height }) => {
      document.documentElement.style.setProperty(
        "--pager-height",
        `${height}px`
      );
    },
  });
  const { totalPages, pages } = usePages();
  const {
    currentSectionNumber,
    currentPageNumber,
    currentPageId,
    answeredBySection,
  } = useProgress();

  const sectionIndex = currentSectionNumber - 1;

  /** if there is an index, this is a content page, otherwise if the
   * index is -1 this is a client-side custom page ex. review page
   */
  const pageIndex = pages.findIndex(({ id }) => id === currentPageId);

  const currentPageAnswered =
    pageIndex > -1 ? answeredBySection[sectionIndex][pageIndex] : false;

  const previousPage = getPreviousPage(pages, pageIndex, currentPageId);
  const nextPage = getNextPage(pages, pageIndex, currentPageId);

  const isNextDisabled = getNextDisabled({
    nextPage,
    enableAll,
    currentPageAnswered,
  });
  const isPreviousDisabled = !previousPage;

  return (
    <Styled.PagerContainer ref={ref} className={className}>
      <Styled.PagerButton
        href={isPreviousDisabled ? "#" : previousPage}
        aria-disabled={isPreviousDisabled}
      >
        {leftText || t("pager.previous")}
      </Styled.PagerButton>
      <Styled.PageCount>
        {t("pager.page-count", {
          current: Math.min(currentPageNumber, totalPages),
          total: totalPages,
        })}
      </Styled.PageCount>
      <Styled.PagerButton
        href={isNextDisabled ? "#" : nextPage}
        aria-disabled={isNextDisabled}
      >
        {rightText || t("pager.next")}
      </Styled.PagerButton>
    </Styled.PagerContainer>
  );
};

Pager.displayName = "Layout.Pager";

export default Pager;
