"use client";
import { FunctionComponent, useContext } from "react";
import { useTranslation } from "@/lib/i18n/client";
import useResizeObserver from "use-resize-observer";
import ProgressContext from "@/contexts/Progress";
import * as Styled from "./styles";

interface PagerProps {
  leftText?: string;
  leftLink: string;
  rightText?: string;
  rightLink: string;
  className?: string;
}

const Pager: FunctionComponent<PagerProps> = ({
  leftText,
  rightText,
  leftLink,
  rightLink,
  className,
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
  const {
    currentSectionNumber,
    currentPageNumber,
    totalPages,
    answeredBySectionPage,
  } = useContext(ProgressContext);

  const sectionIndex = currentSectionNumber - 1;
  const pageIndex = currentPageNumber - 1;
  const isLastPage = currentPageNumber === totalPages;
  const isFirstPage = currentPageNumber === 1;
  const currentPageAnswered = answeredBySectionPage[sectionIndex][pageIndex];
  const isNextDisabled =
    !(currentPageAnswered === true || currentPageAnswered === undefined) ||
    isLastPage;
  const isPreviousDisabled = isFirstPage;

  return (
    <Styled.PagerContainer ref={ref} className={className}>
      <Styled.PagerButton
        href={isPreviousDisabled ? "#" : leftLink}
        aria-disabled={isPreviousDisabled}
      >
        {leftText || t("pager.previous")}
      </Styled.PagerButton>
      <Styled.PageCount>
        {t("pager.page-count", {
          current: currentPageNumber,
          total: totalPages,
        })}
      </Styled.PageCount>
      <Styled.PagerButton
        href={isNextDisabled ? "#" : rightLink}
        aria-disabled={isNextDisabled}
      >
        {rightText || t("pager.next")}
      </Styled.PagerButton>
    </Styled.PagerContainer>
  );
};

Pager.displayName = "Layout.Pager";

export default Pager;
