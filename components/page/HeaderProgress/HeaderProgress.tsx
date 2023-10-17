import { FunctionComponent, useContext } from "react";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib/styles";
import { useTranslation } from "react-i18next";
import ProgressContext from "@/contexts/Progress";
import * as Styled from "./styles";

interface HeaderProgressProps {
  labelledById?: string;
  backgroundColor?: string;
  padding?: boolean;
}

const HeaderProgress: FunctionComponent<HeaderProgressProps> = ({
  labelledById,
  backgroundColor = "var(--neutral10, #f5f5f5)",
  padding = true,
}) => {
  const { t, i18n } = useTranslation();
  const { sections, totalPages, currentPageNumber } =
    useContext(ProgressContext);

  return (
    <Styled.HeaderProgress
      $backgroundColor={backgroundColor}
      $padding={padding}
      aria-labelledby={labelledById}
      role="list"
    >
      <ScreenreaderText aria-live="polite">
        {t("pager.page-count", {
          current: currentPageNumber,
          total: totalPages,
        })}
      </ScreenreaderText>
      {sections.map(({ name, order, pages }, i) => {
        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];
        const isActive = pages.includes(currentPageNumber);
        const isLastSection = lastPage === totalPages;
        const labelId = `section-${order || i}`;

        return (
          <Styled.SectionProgress
            key={`${name}-${order}`}
            aria-current={isActive ? "step" : undefined}
            $proportion={(pages.length / totalPages) * 100}
          >
            <ScreenreaderText id={labelId}>{name}</ScreenreaderText>
            <Styled.ProgressBar
              min={firstPage}
              max={lastPage}
              value={
                currentPageNumber < firstPage ? undefined : currentPageNumber
              }
              markerFormatter={() =>
                Intl.NumberFormat(i18n.language, {
                  style: "percent",
                }).format(currentPageNumber / totalPages)
              }
              labelledById={labelId}
              markerConfig={{
                $filled: !isActive,
                $hoverable: isActive,
              }}
            >
              <Styled.IconMarker
                $value={100}
                $filled
                $background={isLastSection ? "#FFE266" : "#D9F7F6"}
              >
                <IconComposer
                  icon={isLastSection ? "CheckeredFlag" : "Thumbtack"}
                  size={10}
                />
              </Styled.IconMarker>
            </Styled.ProgressBar>
          </Styled.SectionProgress>
        );
      })}
    </Styled.HeaderProgress>
  );
};

HeaderProgress.displayName = "Layout.HeaderProgress";

export default HeaderProgress;
