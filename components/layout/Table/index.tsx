"use client";
import {
  FunctionComponent,
  HTMLProps,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useOverflowDetector } from "@/hooks/useOverflowDetector";
import * as Styled from "./styles";

export interface TableCell extends PropsWithChildren {
  id?: string;
  isHeader?: boolean;
}

interface TableHeaderCell extends TableCell {
  thProps?: HTMLProps<HTMLTableCellElement>;
}

export type TableHeader = Array<TableHeaderCell>;

export type TableRow = Array<Array<TableCell>>;

interface TableProps {
  header: TableHeader;
  rows: TableRow;
  caption?: string;
  id?: string;
  labelledById?: string;
  className?: string;
  overflowPadding?: string;
}

const Table: FunctionComponent<TableProps> = ({
  header = [],
  rows = [],
  id,
  labelledById,
  caption,
  className,
  overflowPadding = 0,
}) => {
  const [scroll, setScroll] = useState(0);
  const [cellIndex, setCellIndex] = useState(0);
  const headerRef = useRef<HTMLTableRowElement>(null);
  const { overflow, ref } = useOverflowDetector({});

  const scrollForward = () => {
    if (headerRef.current && ref.current) {
      const { offsetWidth: parentWidth, scrollLeft } = ref.current;
      const { children } = headerRef.current;

      const start = Math.min(cellIndex + 1, children.length - 1);

      for (let i = start; i < children.length; i++) {
        const th = children[i];
        const { offsetLeft, offsetWidth, cellIndex } =
          th as HTMLTableCellElement;
        const isHidden = offsetLeft + offsetWidth > parentWidth + scrollLeft;

        if (isHidden) {
          const left = offsetLeft;
          if (i <= 0 || i >= children.length - 1) {
            ref.current.scrollTo({ left, behavior: "smooth" });
          } else {
            ref.current.scrollTo({ left, behavior: "smooth" });
          }

          setCellIndex(cellIndex);

          return;
        }
      }
    }
  };
  const scrollBackward = () => {
    if (headerRef.current && ref.current) {
      const { scrollLeft } = ref.current;
      const { children } = headerRef.current;

      const start = Math.max(cellIndex - 1, 0);

      for (let i = start; i < children.length; i--) {
        const th = children[i];
        const { offsetLeft, cellIndex } = th as HTMLTableCellElement;
        const isHidden = offsetLeft < scrollLeft;

        if (isHidden) {
          if (i <= 0 || i >= children.length - 1) {
            ref.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            ref.current.scrollTo({ left: offsetLeft, behavior: "smooth" });
          }

          setCellIndex(cellIndex);

          return;
        }
      }
    }
  };

  return (
    <Styled.TableWrapper
      className={className}
      style={{
        "--table-padding": overflow ? "var(--PADDING_SMALL, 20px)" : undefined,
      }}
    >
      {overflow && (
        <>
          <Styled.ScrollButton
            onClick={() => scrollBackward()}
            disabled={cellIndex <= 0 && scroll <= 0}
            aria-hidden={true}
          >
            <IconComposer icon="ChevronLeftElongated" />
          </Styled.ScrollButton>
          <Styled.ScrollButton
            onClick={() => scrollForward()}
            disabled={cellIndex >= header.length - 1 && scroll > 0}
            aria-hidden={true}
          >
            <IconComposer icon="ChevronRightElongated" />
          </Styled.ScrollButton>
        </>
      )}
      <Styled.ScrollWrapper
        style={{ paddingBlockEnd: overflowPadding }}
        ref={ref as MutableRefObject<HTMLDivElement>}
        onScroll={(event) =>
          setScroll((event.target as HTMLDivElement).scrollLeft)
        }
      >
        <Styled.Table id={id} aria-labelledby={labelledById}>
          {caption && <Styled.Caption>{caption}</Styled.Caption>}
          <thead>
            <tr ref={headerRef}>
              {header.map(({ children, thProps }, i) => (
                <Styled.Header key={i} scope="col" {...thProps}>
                  {children}
                </Styled.Header>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map(({ isHeader, children, id }, i) => (
                  <Styled.Cell
                    key={id || i}
                    as={isHeader ? "th" : undefined}
                    scope={isHeader ? "row" : undefined}
                  >
                    {children}
                  </Styled.Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </Styled.Table>
      </Styled.ScrollWrapper>
    </Styled.TableWrapper>
  );
};

Table.displayName = "Layout.Table";

export default Table;
