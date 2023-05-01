import { FunctionComponent } from "react";
import {
  IconComposer,
  ProgressBar,
  ScreenreaderText,
} from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";

interface HeaderSection {
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
  const getDisplayValue = (currentPage: number, totalPages: number) => {
    const value = Math.min(Math.round((currentPage / totalPages) * 100));

    return `${value}%`;
  };

  return (
    <Styled.HeaderProgress aria-labelledby={labelledById}>
      {sections.map(({ name, order, pages }, i) => {
        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];
        const isActive = pages.includes(currentPage);
        const isLastSection = lastPage === totalPages;
        const labelId = `section-${order || i}`;

        return (
          <Styled.SectionProgress
            key={`${name}-${order}`}
            $proportion={(pages.length / totalPages) * 100}
          >
            <ScreenreaderText id={labelId}>{name}</ScreenreaderText>
            <ProgressBar
              min={firstPage}
              max={lastPage}
              value={currentPage < firstPage ? undefined : currentPage}
              displayValue={
                isActive ? getDisplayValue(currentPage, totalPages) : undefined
              }
              isActive={isActive}
              labelledById={labelId}
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
            </ProgressBar>
          </Styled.SectionProgress>
        );
      })}
    </Styled.HeaderProgress>
  );
};

HeaderProgress.displayName = "Layout.HeaderProgress";

export default HeaderProgress;
