import { FunctionComponent } from "react";
import { Trans } from "react-i18next";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import { ScreenreaderText } from "@rubin-epo/epo-react-lib/styles";
import * as Styled from "./styles";
import { useRouter } from "next/navigation";

export interface HeaderSection {
  name: string;
  order: number;
  pages: number[];
}

interface HeaderProgressProps {
  currentPage: number;
  totalPages: number;
  sections: HeaderSection[];
  labelledById?: string;
}

const HeaderProgress: FunctionComponent<HeaderProgressProps> = ({
  currentPage,
  totalPages,
  sections,
  labelledById,
}) => {
  const { locale = "en-US" } = useRouter();

  return (
    <Styled.HeaderProgress aria-labelledby={labelledById} role="list">
      <ScreenreaderText aria-live="polite">
        <Trans values={{ current: currentPage, total: totalPages }}>
          pager.page-count
        </Trans>
      </ScreenreaderText>
      {sections.map(({ name, order, pages }, i) => {
        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];
        const isActive = pages.includes(currentPage);
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
              value={currentPage < firstPage ? undefined : currentPage}
              markerFormatter={() =>
                Intl.NumberFormat(locale, {
                  style: "percent",
                }).format(currentPage / totalPages)
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
