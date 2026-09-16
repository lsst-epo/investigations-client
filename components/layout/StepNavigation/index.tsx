"use client";
import { useState, useEffect } from "react";
import { ExpandToggle, Container } from "@rubin-epo/epo-react-lib";
import { tokens } from "@rubin-epo/epo-react-lib/styles";
import useResizeObserver from "use-resize-observer";
import * as Styled from "./styles";

const BREAKPOINT = parseFloat(tokens.BREAK_PHABLET);

export interface StepNavigationPage {
  url: string;
  title: string;
}

export interface StepNavigationProps {
  title?: string;
  description?: string;
  pages?: StepNavigationPage[];
  currentUri?: string;
  expandable?: boolean;
  columns?: 1 | 2;
}

// show line between steps unless step is at end of column
function getShowBorder(index: number, length: number, columns: number) {
  if (index === length) return false;
  if (columns === 1) return true;
  return index !== Math.ceil(length / columns);
}

export default function StepNavigation({
  title,
  description,
  pages,
  currentUri,
  expandable = false,
  columns = 2,
}: StepNavigationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: ({ width = 0 }) => {
      setIsBreakpoint(width >= BREAKPOINT);
    },
  });

  useEffect(() => {
    if (isBreakpoint && !isOpen) {
      setIsOpen(true);
    }
  }, [isBreakpoint, isOpen]);

  if (!pages?.length) return null;

  return (
    <Container width="regular" bgColor="orange02" paddingSize="medium">
      <div ref={ref}>
        <Styled.Wrapper>
          <Styled.Header>
            <Styled.TitleDescription>
              <h2>{title}</h2>
              {description && (
                <Styled.Description
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </Styled.TitleDescription>
            {expandable && (
              <ExpandToggle
                onToggle={() => setIsOpen((open) => !open)}
                isOpen={isOpen}
                isHidden={false}
                controlsId="guideNavList"
              />
            )}
          </Styled.Header>
          <Styled.NavList id="guideNavList" $columns={columns} open={isOpen}>
            {pages.map((page, i) => (
              <Styled.NavItem
                key={i}
                $showBorder={getShowBorder(i + 1, pages.length, columns)}
              >
                <Styled.NavLink
                  url={page.url}
                  $active={page.url === currentUri}
                  aria-current={page.url === currentUri ? "page" : undefined}
                >
                  <span>{page.title}</span>
                </Styled.NavLink>
              </Styled.NavItem>
            ))}
          </Styled.NavList>
        </Styled.Wrapper>
      </div>
    </Container>
  );
}
