import { FunctionComponent } from "react";
import { useTranslation } from "@/lib/i18n/client";
import * as Styled from "./styles";

interface PagerProps {
  leftText?: string;
  leftLink: string;
  rightText?: string;
  rightLink: string;
  isLeftDisabled?: boolean;
  isRightDisabled?: boolean;
  totalPages: number;
  currentPage: number;
  className?: string;
}

const Pager: FunctionComponent<PagerProps> = ({
  leftText,
  rightText,
  leftLink,
  rightLink,
  isLeftDisabled = false,
  isRightDisabled = false,
  totalPages,
  currentPage,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <Styled.PagerContainer ref={ref} className={className}>
      <Styled.PagerButton
        href={isLeftDisabled ? "#" : leftLink}
        aria-disabled={isLeftDisabled}
      >
        {leftText || t("pager.previous")}
      </Styled.PagerButton>
      <Styled.PageCount>
        {t("pager.page-count", { current: currentPage, total: totalPages })}
      </Styled.PageCount>
      <Styled.PagerButton
        href={isRightDisabled ? "#" : rightLink}
        aria-disabled={isRightDisabled}
      >
        {rightText || t("pager.next")}
      </Styled.PagerButton>
    </Styled.PagerContainer>
  );
};

Pager.displayName = "Layout.Pager";

export default Pager;
